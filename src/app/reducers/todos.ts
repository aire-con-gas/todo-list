import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';
import * as todoActions from '../actions/todo';

export interface State {
  todoItems: Todo[];
  isDoingSomething: boolean;
  errors: string[];
}

const initialState: State = {
  todoItems: [{
    id: 'abc',
    description: 'FooBar',
    completed: false,
    displayOrder: 1
  }],
  isDoingSomething: false,
  errors: [],
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
  let filteredTodoItems;
  let todoItem;

  switch (action.type) {
    case todoActions.LOAD_TODOS:
    case todoActions.REORDER_TODO:
      return {
        ...state,
        isDoingSomething: true,
        errors: [],
      };
    case todoActions.LOAD_TODOS_SUCCESS:
      // Clear the existing state
      return {
        todoItems: [...action.payload],
        isDoingSomething: false,
        errors: [],
      };
    case todoActions.ADD_TODO:
      return {
        todoItems: [
          ...state.todoItems,
          ...action.payload,
        ],
        isDoingSomething: true,
        errors: []
      };
    case todoActions.ADD_TODO_SUCCESS:
      // Clear the existing state
      return {
        ...state,
        isDoingSomething: false
      };
    case todoActions.TOGGLE_TODO:
      filteredTodoItems = state.todoItems.filter(item => item.id !== action.payload.id);
      todoItem = action.payload;
      todoItem.completed = !todoItem.completed;
      return {
        todoItems: [
          ...filteredTodoItems,
          todoItem
        ],
        isDoingSomething: false,
        errors: [],
      };
    case todoActions.REORDER_TODO_SUCCESS:
      return {
        todoItems: [...action.payload],
        isDoingSomething: false,
        errors: [],
      };
    case todoActions.REORDER_TODO_FAILED:
      return {
        ...state,
        isDoingSomething: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}
