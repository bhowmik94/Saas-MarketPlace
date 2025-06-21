import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tool } from '../models/tool.model';
import { ToolService } from '../services/tool.service';

@Injectable({
  providedIn: 'root'
})
export class ToolRepository {
  constructor(private toolService: ToolService) {}

  getAllTools(): Observable<Tool[]> {
    // Can also add caching or transformation here later
    return this.toolService.fetchTools();
  }
}