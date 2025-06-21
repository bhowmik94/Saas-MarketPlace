
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-auth',
    imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLogin = true;
  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.authForm.invalid) return;
    const { email, password } = this.authForm.value!;
    if (email && password) {
      if (this.isLogin) {
        this.authService.login(email, password);
      } else {
        this.authService.signup(email, password);
      }
    }
  }
}
