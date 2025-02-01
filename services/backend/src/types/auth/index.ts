export interface IJwtPayload {
  user: {
    id: string;
  };
}

export interface IToken {
  token: string;
  expireAt: number;
}
