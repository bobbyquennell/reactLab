import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type){
    return type.substring(type.length -8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state=initialState.numAjaxCallsInProgress, action){
    if(action.type == types.BEGIN_AJAX_CALL){
        return state + 1;

    }
    else if (action.type == types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type))
    //our thunks ultimately dispatch a success action when they complete. That means that I can use the success suffix '_SUCCESS' as a
    //signal that the action is complelted.this will help us avoid manually dispatching a separate endAjaxCall action every time
    // an Ajax  call is completed
    {
        return state -1;
        //note: we will handling the same action in multiple reducers
        //any action types that ends in SUCCESS will now be handled here as well as another reducer
        //and this is a powerfull method: each reducer is simply a slice of state, so a given action may impact multiple reducers.

    }
    else{
        return state;
    }
}
