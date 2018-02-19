import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromTodos from '../reducers/todos';
import * as todoActions from '../actions/todo';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
  }

  handleKeyDown(e) {
    if (e.which === 13) {
      this.store.dispatch(new todoActions.AddTodoAction({
        id: 'abc000',
        description: e.target.value,
        completed: false,
        displayOrder: 100
      }));
    }

  }

}
