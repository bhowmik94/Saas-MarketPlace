import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './features/home/home.component';
import { ToolListComponent } from './features/tool-list/tool-list.component';
import { DashboardComponent } from './features/user/dashboard/dashboard.component';
import { SignInComponent } from './features/auth/signin/signin';
import { SignUpComponent } from './features/auth/signup/signup';
import { Profile } from './features/user/profile/profile';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', canActivate: [NoAuthGuard], component: SignInComponent },
      { path: 'signup', canActivate: [NoAuthGuard], component: SignUpComponent },
      { path: 'tools', component: ToolListComponent },
      { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
      { path: 'profile', canActivate: [AuthGuard], component: Profile },
      // more children
    ]
  },
];
