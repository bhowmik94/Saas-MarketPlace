import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatListModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SidebarComponent {
  readonly user = this.authService.user;
  readonly isAuthenticated = this.authService.isAuthenticated;

  constructor(private authService: AuthService) {}

  logoutUser() {
    this.authService.logout();
  }
}
