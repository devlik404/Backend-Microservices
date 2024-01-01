import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// interface Users {
//   id: string;
//   username: string;
//   email: string;
//   password: string;
// }

@Injectable()
export class IdentityService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  hello(message) {
    return message;
  }
  async register(command): Promise<User> {
    console.log(command);
    try {
      const { username, email, password } = command;
      console.log(username);
      console.log(email);
      console.log(password);
      const hash = await bcrypt.hash(password, 10);
      console.log(hash);

      const result = await this.prisma.user.create({
        data: {
          username,
          email,
          password: hash,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async login(command) {
    console.log(command);
    try {
      const { email, password } = command;
      const validationSign_in = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!validationSign_in) {
        console.log('validationSign_in not found');
      }
      const isMatch = await bcrypt.compare(
        password,
        validationSign_in.password,
      );
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const users = {
        id: validationSign_in.id,
        username: validationSign_in.username,
        email: validationSign_in.email,
      };
      return {
        access_token: await this.jwtService.signAsync(users),
        users: users,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
