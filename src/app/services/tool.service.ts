import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tool } from '../models/tool.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private readonly apiUrl = 'http://localhost:3000/tools';

  constructor(private http: HttpClient) {}

  fetchTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.apiUrl);
  }
}