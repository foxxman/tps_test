import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetPeriodsResponse, Period } from '../../types/responses';
import {
  ERROR_MESSAGES,
  GET_PERIODS_URL,
  PUT_PERIOD_URL,
  WEEK_DAYS,
} from '../../const';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-periods',
  imports: [FormsModule, CommonModule],
  templateUrl: './periods.component.html',
  styleUrl: './periods.component.scss',
})
export class PeriodsComponent {
  periods: Period[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  weekDays: string[] = WEEK_DAYS;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPeriods();
  }

  getPeriods() {
    this.http.get<GetPeriodsResponse>(GET_PERIODS_URL).subscribe({
      next: (data) => (this.periods = data.periods),
      error: (error) =>
        (this.errorMessage =
          error.error.message || 'Failed to get available periods'),
    });
  }

  updatePeriod(period: {
    dayIndex: number;
    startTime: string;
    finishTime: string;
  }) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const headers = new HttpHeaders({
      'x-timezone': timezone,
    });
    this.successMessage = '';

    this.http.put<Period>(PUT_PERIOD_URL, period, { headers }).subscribe({
      next: (updatedPeriod) => {
        const index = this.periods.findIndex((p) => p.id === updatedPeriod.id);
        if (index !== -1) {
          this.periods[index] = updatedPeriod;
        }
        this.successMessage = 'Successfully updated';
        this.errorMessage = '';
      },
      error: ({ error }) => {
        this.errorMessage =
          ERROR_MESSAGES[error.message] || 'Failed to update period';
      },
    });
  }
}
