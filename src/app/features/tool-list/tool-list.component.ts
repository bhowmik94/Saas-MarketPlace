import { Component, OnInit, ViewChild } from '@angular/core';
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
  tools: Tool[] = [];
  filteredTools: Tool[] = [];
  pagedTools: Tool[] = [];

  searchText = '';
  selectedCategory = '';
  categories: string[] = [];

  pageSize = 4;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private toolRepo: ToolRepository) {}

  ngOnInit(): void {
    this.toolRepo.getAllTools().subscribe((data) => {
      this.tools = data;
      this.categories = [...new Set(this.tools.map((t) => t.category))];
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const text = this.searchText.toLowerCase();
    this.filteredTools = this.tools.filter(
      (tool) =>
        (tool.name.toLowerCase().includes(text) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(text))) &&
        (this.selectedCategory ? tool.category === this.selectedCategory : true)
    );

    this.paginator?.firstPage();
    this.updatePagedTools();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedTools();
  }

  updatePagedTools(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedTools = this.filteredTools.slice(start, end);
  }
}
