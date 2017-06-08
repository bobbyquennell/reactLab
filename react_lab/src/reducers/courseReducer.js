export default function courseReducer(state=[], action){
  switch (action.type) {
    case 'CREATE_COURSE':
      console.log('Redux Flow step 3: Reducer update state in store based on the action.type ' + action.type);
      // state.push(action.course);
      //return state;
      return [...state,//spread operator in es6
        //Object.assign({}, action.course)
        action.course//if course is not an object, cannot use Object.assign() as above
      ];
      break;
    default:
      return state;

  }

}
