import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(err => console.error('Login error:', err));
  }

  signup(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(err => console.error('Signup error:', err));
  }
}
