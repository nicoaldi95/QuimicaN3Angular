import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../core/models/auth.models';

type ViewState = 'welcome' | 'login' | 'register';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

currentView = signal<ViewState>('welcome');
  
  // Login Form
  loginForm: FormGroup;
  // Register Form
  registerForm: FormGroup;
  
  // Background Image - Using the one from the prompt
  bgImage = "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbcDYMd0QgTptLU8AT5G7PnR6QBcY0IuoNnpNMfEVDEmtZKox_HUrhFwRQpEG43NN978-hBUeH78riKWXDJR_X4mXB2Md5P8PlCcLQ16gUHo_IkfEvsfW5w_XjhinfaaV32N_3rtLfzTFRIscvZnlIbml0HN5dLWV6GPzSv3qF6lEdsaAv_sECYaNSuNinMAQUPwzca4kTpNScL5mu8g5_CJEwFne3oLZU45EocuSh-CSQ79nYIrkONgntFt2GHbbiXopjXsQFcEw')";
  
  // Hero Image - Flask
  flaskImage = "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArc94wdmcvkjgLEG3cY7FaYQ6EHpaC-qds7UdEXdPoi_umtFN6uH1grFZUsXKqIkEiGGuH871nyMKmyQRF9aUiiRiME5sQIIXKRtXxqABz4lVjjPeIJkENDc3_lrniVzm9QMo5R1UOf8gLSv3_k_Z2FBoP0VoqNHDAa8lurpZm2O8QI5xFBaH14ttlPbGC2VOLZvRiuEeKLkXDOgQNR3CYbyqsr96b6wwvV16v50Kx0W43A7Ggp6ix398e64C69iYIFB47XorL9lA')";

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  navigateTo(view: ViewState) {
    this.currentView.set(view);
    // Reset forms when switching
    if (view === 'login') {
      this.loginForm.reset();
    } else if (view === 'register') {
      this.registerForm.reset();
    }
  }

  onLogin() {
    // Iniciar login con Google SSO
    this.authService.login();
  }

  onRegister() {
    if (this.registerForm.valid) {
      const data: RegisterRequest = this.registerForm.value;
      this.authService.register(data).subscribe({
        next: (response) => {
          console.log(response.message);
          this.navigateTo('login');
        },
        error: (err) => {
          console.error(err.error.error || 'Error en el registro');
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
