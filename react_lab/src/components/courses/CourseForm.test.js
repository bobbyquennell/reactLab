import expect from 'expect';
import React from 'react';
//import TestUtils from 'react-addons-test-utils'; //TestUtils have been moved to react-dom/test-utils
//https://www.npmjs.com/package/react-addons-test-utils
import ShallowRenderer from 'react-test-renderer/shallow';//Shallow renderer has been moved to react-test-renderer/shallow
//import ReactTestRenderer from 'react-test-renderer';
import CourseForm from './CourseForm';

function setup(saving){
  let props ={
    course:{}, saving:saving, errors: {},
    onSave:()=>{},
    onChange:()=>{}
  };
  //let renderer = TestUtils.createRender();
  let renderer = new ShallowRenderer();
  renderer.render(<CourseForm {...props}/>);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('CourseForm via React Test Utils', ()=>{
  it('renders from and h1', ()=>{
     const {output} = setup(false);
     expect(output.type).toBe('form');
     let [h1] = output.props.children;
     expect(h1.type).toBe(h1);

  });

  it('save button is labeled "Save" when not saving', ()=>{
    const{output} = setup(false);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', ()=>{
    const { output } = setup(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  })
});
