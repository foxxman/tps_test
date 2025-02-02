export interface TokenResponse {
  token: string;
  expireAt: number;
}

export interface UserResponse {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  user: UserResponse;
  token: TokenResponse;
}

export interface Period {
  id: string;
  dayIndex: number;
  startTime: string;
  finishTime: string;
}

export interface GetPeriodsResponse {
  periods: Period[];
}
