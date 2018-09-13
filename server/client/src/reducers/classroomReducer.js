import {
  GET_CLASSROOM,
  GET_CLASSROOMS,
  CLASSROOM_LOADING
} from '../actions/types';

// CLEAR_CURRENT_CLASSROOM
// GET_ERRORS,
// SET_CURRENT_CLASSROOM

const initialState = {
  classroom: null,
  classrooms: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLASSROOM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CLASSROOM:
      return {
        ...state,
        classroom: action.payload,
        loading: false
      };
    case GET_CLASSROOMS:
      return {
        ...state,
        classrooms: action.payload,
        loading: false
      };
    // case SET_CURRENT_CLASSROOM:
    //   return {
    //     ...state,
    //     classroom: null
    //   };
    default:
      return state;
  }
}
