import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage Course Page', ()=>{
  it('sets error message when trying to save empty title', ()=>{
    const wrapper = mount(<Provider store={store}><ManageCoursePage/></Provider>);
  });
});
