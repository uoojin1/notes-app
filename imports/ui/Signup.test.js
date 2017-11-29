import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if (Meteor.isClient) {
    describe('Signup', function(){
        it('should show error msgs', function() {
            const error = 'This is not working';
            const wrapper = mount(<Signup createUser={() => {}}></Signup>);
            
            wrapper.setState({ error });
            const pText = wrapper.find('p').text();
            expect(pText).toBe(error);

            wrapper.setState({ error: '' });
            const pTextLength = wrapper.find('p').length;
            expect(pTextLength).toBe(0);
        });

        it('should call createUser with the form data', function() {
            const email = 'eugene@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}></Signup>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });

        it('should set error if short password', function() {
            const email = 'eugene@test.com';
            const password = '    123                       ';
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}></Signup>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');

            expect(wrapper.state('error').length).toBeGreaterThan(0);
        });

        it('should set createUser callback errors', function() {
            const password = 'password123!';
            const reason = 'this is why it failed'
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}></Signup>);

            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[1]({ reason });
            expect(wrapper.state('error')).toBe(reason);

            spy.calls[0].arguments[1]();
            expect(wrapper.state('error').length).toBe(0);
        });
    });
}