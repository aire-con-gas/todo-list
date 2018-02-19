import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';
import * as todoActions from '../actions/todo';

export interface State {
  todoItems: Array<Todo>;
  isDoingSomething: boolean;
}

const initialState = {
  todoItems: [{
    id: 'abc',
    description: 'FooBar',
    completed: false,
    displayOrder: 1
  }],
  isDoingSomething: false,
};

// First revision
// export function todosReducer(state = initialState, action) {
//   switch (action.type) {
//     case todoActions.LOAD_TODOS_SUCCESS:
//       // This will keep adding to the existing state
//       // return [
//       //   ...state,
//       //   ...action.payload,
//       // ];

//       // Clear the existing state
//       return [
//         ...action.payload,
//       ];
//     default:
//       return state;
//   }
// }

// Second revision
export function todosReducer(state = initialState, action): State {
  switch (action.type) {
    case todoActions.LOAD_TODOS:
      return {
        ...state,
        isDoingSomething: true,
      };
    case todoActions.LOAD_TODOS_SUCCESS:
      // Clear the existing state
      return {
        todoItems: [...action.payload],
        isDoingSomething: false
      };
    case todoActions.ADD_TODO:
      return {
        todoItems: [
          ...state.todoItems,
          ...action.payload,
        ],
        isDoingSomething: true
      };
    case todoActions.ADD_TODO_SUCCESS:
      // Clear the existing state
      return {
        ...state,
        isDoingSomething: false
      };
    default:
      return state;
  }
}
