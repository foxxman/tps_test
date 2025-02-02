import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PeriodsComponent } from './periods/periods.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'periods', component: PeriodsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
