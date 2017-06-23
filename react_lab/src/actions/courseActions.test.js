import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

/* below imports are used for thunk testing */
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


//test a sync action
describe('Course Actions', ()=>{
  describe('createCourseSuccess', ()=>{
    it('should create a CREATE_COURSE_SUCCESS action', ()=>{
      //arrange
      const course = {id:'clean-code', title:'Clean Code'};
      const expectedAction = {
        type:types.CREATE_COURSE_SUCCESS,
        course:course
      };

      //act
      const action = courseActions.createCourseSuccess(course);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', ()=>{
    afterEach(()=>{
      //afterEach is a mocha hook function, runs after each test in below block
      nock.cleanAll(); // after each async call, make a clean up;
    });
    // notice: we pass a callback functions called: done to Mocha. Call this function when async work is compelete.
    //for details, see: https://mochajs.org/#asynchronous-code
    it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done)=>{
            //Here's an example call to nock, this will be used for a reall web api, but since here we are using the mock course API, we don't need it right now.
            //nock('http://example.com/')
            //  .get('/courses')
            //  .reply(200, {body:{courses:[{id:1, firstName:'Cory', lastName:'House'}]}});
            const expectedActions = [
              {type: types.BEGIN_AJAX_CALL},
              {type: types.LOAD_COURSES_SUCCESS, body:{courses:[{id:1, firstName:'Cory', lastName:'House'}]}}
            ];

            const store = mockStore({courses:[]}, expectedActions);//set up a mockStore with inistial state and expectedActions
            store.dispatch(courseActions.loadCourses()).then(()=>{
              const actions = store.getActions();
              expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
              expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
              done();
            });

    });
});
