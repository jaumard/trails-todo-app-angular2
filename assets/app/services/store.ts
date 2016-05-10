import Todo from '../todo';
import { Injectable } from 'angular2/core';
import {RequestOptions, Headers, URLSearchParams, Http} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export default class TodoService {
  todos:Array<Todo>;
  baseUrl = 'http://localhost:3000';

  constructor(private _http:Http) {
    this.todos = [];
    this.getTodos().then(todos => this.todos = todos);
  }

  getTodos() {
    return this._http.get(`${this.baseUrl}/api/v1/todo`).map(res => res.json()).toPromise();
  }

  getTodo(id:number) {
    return this._http.get(`${this.baseUrl}/api/v1/todo/${id}`).map(res => res.json()).toPromise();
  }

  deleteTodo(id:number) {
    return this._http.delete(`${this.baseUrl}/api/v1/todo/${id}`).map(res => res.json()).toPromise()
      .then(todo => this.getTodos().then(todos => this.todos = todos));
  }

  removeCompleted() {
    const options = this.getRequestOptions();
    //options.body = JSON.stringify({completed:true});
    return this._http.delete(`${this.baseUrl}/api/v1/todo?completed=true`, options).map(res => res.json()).toPromise()
      .then(todo => this.getTodos().then(todos => this.todos = todos));
  }

  toggleCompletion(todo:Todo) {
    todo.completed = !todo.completed;
    this.saveTodo(todo);
  }

  saveTodo(todo:Todo) {
    const options = this.getRequestOptions();
    delete todo.editing;
    if (!todo.id || todo.id == -1) {
      delete todo.id;
      return this._http.post(`${this.baseUrl}/api/v1/todo`, JSON.stringify(todo), options)
        .map(res => res.json()).toPromise().then(todo => this.getTodos().then(todos => this.todos = todos));
    }
    else {
      return this._http.put(`${this.baseUrl}/api/v1/todo/${todo.id}`, JSON.stringify(todo), options)
        .map(res => res.json()).toPromise().then(todo => this.getTodos().then(todos => this.todos = todos));
    }
  }

  allCompleted() {
    return this.todos.length === this.getCompleted().length;
  }

  getCompleted() {
    return this.getWithCompleted(true);
  }

  getRemaining() {
    return this.getWithCompleted(false);
  }

  setAllTo(completed: Boolean) {
    const options = this.getRequestOptions();
    return this._http.put(`${this.baseUrl}/api/v1/todo`, JSON.stringify({completed:completed}), options)
      .map(res => res.json()).toPromise().then(todo => this.getTodos().then(todos => this.todos = todos));
  }

  private getRequestOptions(){
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    return new RequestOptions({headers: headers});
  }

  private getWithCompleted(completed:Boolean) {
    return this.todos.filter((todo:Todo) => todo.completed == completed);
  }
}

/*
 export default class TodoStore {
 todos: Array<Todo>;

 constructor() {
 let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
 // Normalize back into classes
 this.todos = persistedTodos.map( (todo: {_title: String, completed: Boolean}) => {
 let ret = new Todo(todo._title);
 ret.completed = todo.completed;
 return ret;
 });
 }

 private updateStore() {
 localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
 }

 private getWithCompleted(completed: Boolean) {
 return this.todos.filter((todo: Todo) => todo.completed === completed);
 }

 allCompleted() {
 return this.todos.length === this.getCompleted().length;
 }

 setAllTo(completed: Boolean) {
 this.todos.forEach((t: Todo) => t.completed = completed);
 this.updateStore();
 }

 removeCompleted() {
 this.todos = this.getWithCompleted(false);
 this.updateStore();
 }

 getRemaining() {
 return this.getWithCompleted(false);
 }

 getCompleted() {
 return this.getWithCompleted(true);
 }

 toggleCompletion(todo: Todo) {
 todo.completed = !todo.completed;
 this.updateStore();
 }

 remove(todo: Todo) {
 this.todos.splice(this.todos.indexOf(todo), 1);
 this.updateStore();
 }

 add(title: String) {
 this.todos.push(new Todo(title));
 this.updateStore();
 }
 }
 */
