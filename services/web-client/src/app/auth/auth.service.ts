import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { POST_LOGIN_URL } from '../../const';
import { LoginResponse } from '../../types/responses';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';
  private isLoggedIn: boolean = Boolean(this.getToken());
  private accessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  get isAuthenticated() {
    return this.isLoggedIn;
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(POST_LOGIN_URL, {
      email,
      password,
    });
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedIn = true;
  }

  getToken() {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem(this.tokenKey) || null;
    }
    return this.accessToken;
  }
}
