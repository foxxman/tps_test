import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/types/user';

export class UserResponse implements IUser {
  @ApiProperty({
    description: `User's unique identifier`,
    example: '12345-12345-12345',
  })
  id: string;

  @ApiProperty({
    example: 'user1@some.com',
    description: `User's email`,
    nullable: true,
  })
  email: string;

  @ApiProperty({
    description: `User's creation date`,
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: `User's last update date`,
    example: new Date(),
  })
  updatedAt: Date;
}
