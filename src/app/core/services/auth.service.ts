import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { RegisterRequest, RegisterResponse, VerifyEmailResponse, LoginResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.apiService.post<RegisterResponse>('/auth/register', data);
  }

  verifyEmail(token: string): Observable<VerifyEmailResponse> {
    return this.apiService.get<VerifyEmailResponse>(`/auth/verify/${token}`);
  }

  login(): Observable<LoginResponse> {
    // Para SSO con Google, redirigir a /auth/login
    window.location.href = `${this.apiService.getBaseUrl()}/auth/login`;
    return new Observable(); // No se usa realmente, ya que redirige
  }
}