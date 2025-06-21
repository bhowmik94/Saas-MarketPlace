import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './features/home/home.component';
import { ToolListComponent } from './features/tool-list/tool-list.component';
import { DashboardComponent } from './features/user/dashboard/dashboard.component';
import { AuthComponent } from './features/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: AuthComponent },
      { path: 'signup', component: AuthComponent },
      { path: 'tools', component: ToolListComponent },
      { path: 'dashboard', component: DashboardComponent },
      // more children
    ]
  },
];
