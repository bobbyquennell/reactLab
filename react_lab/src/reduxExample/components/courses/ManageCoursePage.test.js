import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

/* option 1: wrapper the target component with <Provider> */
/* import configureStore from '../../store/configureStore';
import {Provider} from 'react-redux';
const store = configureStore();

describe('Manage Course Page', ()=>{
  it('sets error message when trying to save empty title', ()=>{
    const wrapper = mount(<Provider store={store}><ManageCoursePage/></Provider>);
  });
});*/


/* */
describe('Manage Course Page', ()=>{
    it('sets error message when trying to save empty title', ()=>{

        const propsMock = {
            authors:[],
            actions:{ saveCourse: ()=>{return Promise.resolve();}},
            initialCourse:{id:'', watchHref:'', title:'', authorId:'', length:'', category:''}
        };
        const wrapper = mount(<ManageCoursePage {...propsMock}/>);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });
});
