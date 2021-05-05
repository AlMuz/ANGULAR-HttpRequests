import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";

export interface Todo {
  completed: boolean;
  title: string;
  id?: number;
}

@Injectable({ providedIn: "root" })
export class TodosService {
  endpoint = "https://jsonplaceholder.typicode.com/todos";
  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.endpoint, todo);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.endpoint}?_limit=2`).pipe(delay(500));
  }

  removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
