import {Component} from 'angular2/core';
import TodoService from './services/store';
import Todo from './todo';

@Component({
  selector: 'todo-app',
  templateUrl: 'app/app.html'
})
export default class TodoApp {
  todoStore:TodoService;
  newTodoText = '';

  constructor(todoStore:TodoService) {
    this.todoStore = todoStore;
  }

  stopEditing(todo:Todo, editedTitle:string) {
    todo.title = editedTitle;
    todo.editing = false;
  }

  cancelEditingTodo(todo:Todo) {
    todo.editing = false;
  }

  updateEditingTodo(todo:Todo, editedTitle:string) {
    editedTitle = editedTitle.trim();
    todo.editing = false;

    if (editedTitle.length === 0) {
      return this.todoStore.deleteTodo(todo.id);
    }

    todo.title = editedTitle;
    return this.todoStore.saveTodo(todo);
  }

  editTodo(todo:Todo) {
    todo.editing = true;
  }

  removeCompleted() {
    this.todoStore.removeCompleted();
  }

  toggleCompletion(todo:Todo) {
    this.todoStore.toggleCompletion(todo);
  }

  remove(todo:Todo) {
    this.todoStore.deleteTodo(todo.id);
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoStore.saveTodo(new Todo(this.newTodoText));
      this.newTodoText = '';
    }
  }
}
