import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';
import * as todoActions from '../actions/todo';

export interface State {
  todoItems: Todo[];
  isDoingSomething: boolean;
}

const initialState: State = {
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
  let filteredTodoItems;
  let todoItem;

  switch (action.type) {
    case todoActions.LOAD_TODOS:
    case todoActions.REORDER_TODO:
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
    case todoActions.TOGGLE_TODO:
      filteredTodoItems = state.todoItems.filter(item => item.id !== action.payload.id);
      todoItem = action.payload;
      todoItem.completed = !todoItem.completed;
      return {
        todoItems: [
          ...filteredTodoItems,
          todoItem
        ],
        isDoingSomething: false
      };
    case todoActions.REORDER_TODO_SUCCESS:
      return {
        todoItems: [...action.payload],
        isDoingSomething: false
      };
      // todoItem = action.payload.todoItem;
      // console.log('todoItem', todoItem);

      // const direction = action.payload.direction;
      // const todoItems: Todo[] = state.todoItems.slice();
      // const atIdx = todoItem.displayOrder;
      // let swapIdx;
      // let temp;

      // if (direction === 'up' && atIdx > 1) {
      //   swapIdx = atIdx - 1;
      // } else {
      //   swapIdx = atIdx + 1;
      // }

      // temp = todoItems[swapIdx];

      // temp.displayOrder = atIdx;
      // todoItem.displayOrder = swapIdx;

      // todoItems[swapIdx] = todoItem;
      // todoItems[atIdx] = temp;
      // todoItems.sort((a, b) => a.displayOrder - b.displayOrder);

      // console.log('todoItems', todoItems);

      // return {
      //   todoItems,
      //   isDoingSomething: false
      // };
    default:
      return state;
  }
}
