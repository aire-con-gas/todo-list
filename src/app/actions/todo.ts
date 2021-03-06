// Inteface of an Action from ngrx/store's dispatcher
// export interface Action {
//   type: string;
//   payload?: any;
// }
import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';

export const LOAD_TODOS = '[TODO] Load Todos';
export class LoadTodosAction implements Action {
  readonly type = LOAD_TODOS;
}

export const LOAD_TODOS_SUCCESS = '[TODO] Load Todos Success';
export class LoadTodosSuccessAction implements Action {
  readonly type = LOAD_TODOS_SUCCESS;

  constructor(public payload: Todo[]) {}
}

export const ADD_TODO = '[TODO] Add Todo';
export class AddTodoAction implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: Todo) {}
}

export const ADD_TODO_SUCCESS = '[TODO] Add Todo Success';
export class AddTodoSuccessAction implements Action {
  readonly type = ADD_TODO_SUCCESS;
}

export const SIMPLE_ACTION = 'SIMPLE_ACTION';
export class SimpleAction implements Action {
  readonly type = SIMPLE_ACTION;
}

export const SIMPLE_FINISHED_ACTION = 'SIMPLE_FINISHED_ACTION';
export class SimpleFinishedAction implements Action {
  readonly type = SIMPLE_FINISHED_ACTION;
}

// 'type' is an Typescript type alias which introduces a name
// and type parameters that will be referenced when called upon that type alias
// see: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.10
export type Actions = LoadTodosAction | SimpleAction | SimpleFinishedAction;
