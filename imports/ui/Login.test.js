import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {
    describe('Login', function(){
        it('should show error msgs', function() {
            const error = 'This is not working';
            const wrapper = mount(<Login loginWithPassword={() => {}}></Login>);
            
            wrapper.setState({ error });
            const pText = wrapper.find('p').text();
            expect(pText).toBe(error);

            wrapper.setState({ error: '' });
            const pTextLength = wrapper.find('p').length;
            expect(pTextLength).toBe(0);
        });

        it('should call loginWithPassword with the form data', function() {
            const email = 'eugene@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy}></Login>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({ email });
            expect(spy.calls[0].arguments[1]).toBe(password);            
        });

        it('should set loginWithPassword callback errors', function() {
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy}></Login>);

            wrapper.find('form').simulate('submit');
            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error')).toNotBe('');
            
            wrapper.find('form').simulate('submit');
            spy.calls[0].arguments[2]();            
            expect(wrapper.state('error')).toBe('');   
        });
    });
}