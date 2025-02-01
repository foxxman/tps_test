import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import {
  PasswordInvalidException,
  UserNotFoundException,
} from '../../errors/users';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload, IToken } from 'src/types/auth';
import { addMinutes } from 'date-fns';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signInWithPassword({ email, password }: LoginDto): Promise<{
    user: User;
    token: IToken;
  }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = await this.verifyPassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new PasswordInvalidException();
    }

    const jwtPayload: IJwtPayload = {
      user: {
        id: user.id,
      },
    };

    const expiresInMinutes = 20;

    const token = this.jwtService.sign(jwtPayload, {
      expiresIn: `${expiresInMinutes}m`,
    });
    const expireAt = addMinutes(Date.now(), expiresInMinutes).valueOf();

    return {
      user,
      token: {
        token,
        expireAt,
      },
    };
  }

  private async verifyPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    const compare = await bcrypt.compare(password, passwordHash);
    return compare;
  }
}
