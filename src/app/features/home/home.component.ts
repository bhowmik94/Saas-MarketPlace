import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-home',
    imports: [MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, NgFor],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  features = [
    {
      title: 'Browse Tools',
      description: 'Find SaaS tools by category, features, and pricing.',
    },
    {
      title: 'Compare Plans',
      description: 'Get a quick glance at what each plan offers.',
    },
    {
      title: 'Manage Subscriptions',
      description: 'All your tools in one dashboard.',
    },
  ];
}
