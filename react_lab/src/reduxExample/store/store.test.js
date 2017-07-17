/* integration test  for store */

import expect from 'expect';
import { createStore} from 'redux';
import  rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', function(){
    it('Should handle creating courses', function(){
        //arrange
        const store = createStore(rootReducer, initialState);
        const course = {
            title:'Clean Code'
        };
        //act
        const action = courseActions.createCourseSuccess(course);
        store.dispatch(action);
        // we can dispatch more action here: dispatch 2 createCourseSuccess actions, then dispatch 1 updateCourseSuccess action, etc.
        // and assert that the final store have the 2 courses with the expected values
        //assert
        const actual = store.getState().courseReducer[0];
        const expected = {
            title:'Clean Code'
        };
        expect(actual).toEqual(expected);

    });
});
