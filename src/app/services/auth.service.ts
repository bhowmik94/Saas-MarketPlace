import { Injectable, computed, effect, signal } from '@angular/core';
import {
  Auth,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<User | null>(null);

  readonly user = computed(() => this.userSignal());
  readonly isAuthenticated = computed(() => !!this.userSignal());

  constructor(private auth: Auth, private router: Router) {
    // Sync with Firebase Auth state
    onAuthStateChanged(this.auth, (user) => {
      this.userSignal.set(user);
      console.log('[Auth State Changed]', user?.email || 'Logged out');
    });

    // Optional: reactively log auth changes
    effect(() => {
      const user = this.user();
      // console.log('[Auth Change]', user?.email || 'Logged out');
    });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((credential) => {
        this.userSignal.set(credential.user); // ✅ Set user signal explicitly
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => console.error('Login error:', err));
  }

  signup(email: string, password: string) {
    console.log('Signing up with:', email, password);
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((credential) => {
        this.userSignal.set(credential.user); // ✅ Set user signal explicitly
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => console.error('Signup error:', err));
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.userSignal.set(null); // Clear user signal to avoid multiple rerenders
        this.router.navigate(['/login']);
      })
      .catch((err) => console.error('Logout error:', err));
  }
}
