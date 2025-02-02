import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ERROR_MESSAGES } from '../../const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/periods']);
    }
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token.token);
        this.router.navigate(['/periods']);
      },
      error: ({ error }) => {
        console.log({ error });

        this.errorMessage =
          ERROR_MESSAGES[error.message] || 'Please, try again';
      },
    });
    console.log(this.email, this.password);
  }
}
