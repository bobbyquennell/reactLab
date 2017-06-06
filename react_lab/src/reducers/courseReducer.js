export default function courseReducer(state=[], action){
  switch (action.type) {
    case 'CREATE_COURSE':
      // state.push(action.course);
      // return state;
      return [...state,//spread operator in es6
        Object.assign({}, action.course)
      ];
      break;
    default:
      return state;

  }

}
