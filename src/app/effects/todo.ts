import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { Todo } from '../models/todo';
import * as todoActions from '../actions/todo';

import { tap, switchMap } from 'rxjs/operators';

interface Action {
  type: string;
  payload?: any;
}

const mockTodos = () => {
  const todos = [];
  for (let i = 0; i < 10; i++) {
    todos.push({
      id: `abc${i}`,
      description: `FooBar ${i}`,
      completed: false,
      displayOrder: i
    });
  }

  return todos;
};

@Injectable()
export class TodoEffects {
  // actions$ <- dollar sign is a convention for observables
  // Actions is an Observable<Action> class from ngrx/effects
  constructor(private actions$: Actions, private store$: Store<any>) {
    console.log('>>> actions stream', this.actions$);
  }

  // @Effect <- property decorator with a dispatch flag
  // PropertyDecorator doesn't seem to do much since it returns a void

  // First revision
  // @Effect()
  // simple$ = this.actions$
  //   .ofType('SIMPLE_ACTION')
  //   .switchMap(() => Observable.of({ type: 'SIMPLE_ACTION_FINISHED' }));

  // Second revision
  @Effect()
  simple$ = this.actions$
    .pipe(
      ofType(todoActions.SIMPLE_ACTION),
      tap(val => console.log('SIMPLE ACTION triggered ')),
      switchMap(() => Observable.of({ type: todoActions.SIMPLE_FINISHED_ACTION }))
    );

  // First revision
  // @Effect()
  // load$: Observable<Action> = this.actions$
  //   .ofType(todoActions.LOAD_TODOS)
  //   .do(val => console.log(`${todoActions.LOAD_TODOS} triggered`))
  //   .switchMap(() => {
  //     return Observable.timer(800)
  //       .switchMap(() => Observable.of({
  //         type: todoActions.LOAD_TODOS_SUCCESS,
  //         payload: mockTodos(),
  //        }));
  //   });

  // Second revision

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(todoActions.LOAD_TODOS)
    .do(val => console.log(`${todoActions.LOAD_TODOS} triggered`))
    // use switchMap because we don't care that any previous inner
    // observable gets cancelled. switchMap literally switches to a new
    // observable
    .switchMap(() => {
      return Observable.timer(800)
        .switchMap(() => Observable.of(
          new todoActions.LoadTodosSuccessAction(mockTodos())
        ));
    });

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(todoActions.ADD_TODO)
    .do(val => console.log(`${todoActions.ADD_TODO} triggered`))
    .map((action: any) => action.payload)
    // use mergeMap because we want to flatten an inner observable
    // allows for multiple inner subscriptions. need to be careful of memory leaks
    .mergeMap(payload =>
      // Could do an HTTP call here to write to a db
      Observable.of(new todoActions.AddTodoSuccessAction())
    );

  @Effect()
  reorder$: Observable<Action> = this.actions$
    .ofType(todoActions.REORDER_TODO)
    .do(val => console.log(`${todoActions.REORDER_TODO} triggered`))
    .withLatestFrom(this.store$)
    .map(([action, storeState]) => {
      const todoItem = (action as Action).payload.todoItem;
      const direction = (action as Action).payload.direction;
      const todoItems: Todo[] = storeState.todos.todoItems.slice();
      const atIdx = todoItem.displayOrder;
      let swapIdx;
      let temp;

      if (direction === 'up' && atIdx > 1) {
        swapIdx = atIdx - 1;
      } else if (direction === 'down' && atIdx < todoItems.length) {
        swapIdx = atIdx + 1;
      } else {
        throw new Error('Can\'t reorder!');
        // NOTE: Supposedly Observable.empty and Observable.of end the stream
        // but this isn't true. Need to understand the Observable contract
        // http://reactivex.io/documentation/contract.html

        // return Observable.empty();
        // return Observable.of(new todoActions.ReorderTodoFailedAction({
        //   todoItems,
        //   isDoingSomething: false,
        //   errors: ['Can\'t reorder']
        // }));
      }

      temp = todoItems[swapIdx];

      temp.displayOrder = atIdx;
      todoItem.displayOrder = swapIdx;

      todoItems[swapIdx] = todoItem;
      todoItems[atIdx] = temp;
      todoItems.sort((a, b) => a.displayOrder - b.displayOrder);
      return todoItems;
    })
    .mergeMap(payload => Observable.of(new todoActions.ReorderTodoSuccessAction(payload)))
    .catch(err => Observable.of(new todoActions.ReorderTodoFailedAction(err.message)));
}
