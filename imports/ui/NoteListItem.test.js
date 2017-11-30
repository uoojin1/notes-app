import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import NoteListItem from './NoteListItem';

if(Meteor.isClient){
    describe('NoteListItem', function() {
        it('should render title and timestamp', function(){
            const title = 'My title';
            const updatedAt = 123121231;
            const wrapper = mount(<NoteListItem note={ {title,updatedAt} }/>);

            expect(wrapper.find('h5').text()).toBe(title);
        });

        it('should render default title if no title set', function(){
            const title = '';
            const updatedAt = 123121231;
            const wrapper = mount(<NoteListItem note={ {title,updatedAt} }/>);

            expect(wrapper.find('h5').text()).toBe('Untitled note');
        });
    });
}