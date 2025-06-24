import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Tool } from '../models/tool.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private readonly apiUrl = 'http://localhost:3000/tools';

  constructor(private firestore: Firestore) {}

  fetchTools(): Observable<Tool[]> {
    const toolsCollection = collection(this.firestore, 'tools');
    return collectionData(toolsCollection, { idField: 'id' }) as Observable<Tool[]>;
  }
}