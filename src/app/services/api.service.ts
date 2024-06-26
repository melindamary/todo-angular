import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo.interface';
import { ToDoResponse } from '../models/todo.response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://dummyjson.com/todos'
  constructor(private http:HttpClient) { }

  getData():Observable<ToDoResponse>{
    return this.http.get<ToDoResponse>(this.apiUrl);
  }
}



