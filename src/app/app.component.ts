import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

export interface Todo {
  completed: boolean;
  title: string;
  id?: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=2")
      .subscribe((todos) => {
        this.todos = todos;
      });
  }
}
