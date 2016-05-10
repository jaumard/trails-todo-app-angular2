export default class Todo {
  completed: Boolean;
  editing: Boolean;
  id: number;
  title: String;

  constructor(title: String) {
    this.completed = false;
    this.editing = false;
    this.title = title.trim();
  }
}
