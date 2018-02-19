import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromTodos from '../reducers/todos';
import * as todoActions from '../actions/todo';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.css']
})
export class TodosContainerComponent implements OnInit {

  todos$: Observable<any[]>;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    // select can take in either a string value or
    // a callback function where state is provided

    // this.todos$ = this.store.pipe(select('todos'));
    this.todos$ = this.store.pipe(select(state => state.todos.todoItems));
  }

  handleClick() {
    // this.store.dispatch(new todoActions.SimpleAction());
    this.store.dispatch(new todoActions.LoadTodosAction());
  }

}
