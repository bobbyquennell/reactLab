import React from "react";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
//pattern: different to e1.js or e2.js,
//when create a stateless functional components, I prefer to destructure all the props here
// in the function's argument list. which will keep the calls nice and short.
// another benefit is making the component's dependencies clear: you can glance at the
//function signature and clearly see what's required.
const CourseForm = ({course, allAuthors, onSave, onChange, loading,errors}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextInput
        name='title'
        label='Title'
        value={course.title}
        onChange={onChange}
        error={errors.title}/>
      <SelectInput
       name='authorId'
       label='Author'
       value={course.authorId}
       defaultOption='Select Author'
       options={allAuthors}
       onChange={onChange} error={errors.authorId}/>
       <TextInput
         name='category'
         label='Category'
         value={course.Category}
         onChange={onChange}
         error={errors.category}/>
      <TextInput
        name='length'
        label='Length'
        value={course.length}
        onChange={onChange}
        error={errors.length}/>
      <input
        type='submit'
        disabled={loading}
        value={loading ? 'Saving...' : 'Save'}
        className='btn btn-primary'
        onClick={onSave}/>

    </form>
  );
};

export default CourseForm;
