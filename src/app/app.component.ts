import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { delay } from "rxjs/operators";
import { Todo, TodosService } from "./todo.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  loading = false;

  todoTitle = "";

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false,
    };

    this.todosService.addTodo(newTodo).subscribe((todo) => {
      todo.id = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
      this.todos.push(todo);
      this.todoTitle = "";
    });
  }

  fetchTodos() {
    this.loading = true;

    this.todosService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.loading = false;
    });
  }

  removeTodo(id: number) {
    console.log(id);

    this.todosService.removeTodo(id).subscribe(() => {
      this.todos = this.todos.filter((ele) => ele.id !== id);
    });
  }
}
