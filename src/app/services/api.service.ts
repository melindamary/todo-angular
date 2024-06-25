import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://dummyjson.com/todos'
  constructor(private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}



