import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ToolRepository } from '../../repositories/tool.repository';
import { Tool } from '../../models/tool.model';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-tool-list',
    imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatPaginatorModule,
        MatButtonModule,
        FormsModule,
        NgFor
    ],
    templateUrl: './tool-list.component.html',
    styleUrl: './tool-list.component.scss'
})
export class ToolListComponent implements OnInit {
  private repo = inject(ToolRepository);

  tools: Tool[] = [];
  filteredTools: Tool[] = [];

  searchText = '';
  selectedCategory = '';
  categories: string[] = [];

  ngOnInit(): void {
    this.repo.getAllTools().subscribe({
      next: (tools) => {
        this.tools = tools;
        this.categories = [...new Set(this.tools.map(t => t.category))];
        this.applyFilters();
      },
      error: (err) => console.error('Error loading tools from Firebase:', err)
    });
  }

  applyFilters(): void {
    const query = this.searchText.toLowerCase().trim();
    this.filteredTools = this.tools.filter(tool =>
      (tool.name.toLowerCase().includes(query) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(query))) &&
      (this.selectedCategory ? tool.category === this.selectedCategory : true)
    );
  }

}
