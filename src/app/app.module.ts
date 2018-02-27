import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { TodosContainerComponent } from './todos-container/todos-container.component';
import { TodosListComponent } from './todos-container/todos-list/todos-list.component';
import { AddTodoComponent } from './todos-container/add-todo/add-todo.component';

import { todosReducer } from './reducers/todos';
import { TodoEffects } from './effects/todo';


@NgModule({
  declarations: [
    AppComponent,
    TodosContainerComponent,
    TodosListComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    StoreModule.forRoot({ todos: todosReducer }),
    EffectsModule.forRoot([TodoEffects]),
    // EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
