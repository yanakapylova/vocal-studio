import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    console.log(email);

    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      console.log('Неверный email ');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Неверный пароль ');
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo: {
        id: user.id,
        password: user.password,
        email: user.email,
        name: user.name,
        surname: user.surname,
        birthdate: user.birthdate,
        role: user.role,
        photoURL: user.photoURL,
        isActive: user.isActive,
        groups: user.groups,
      },
    };
  }
}
