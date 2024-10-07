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

  async signIn(phone: string, password: string): Promise<any> {
    console.log(phone);

    const user = await this.usersService.findUserByPhone(phone);
    if (!user) {
      console.log('Неверный phone ');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Неверный пароль ');
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.phone };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo: {
        phone: user.phone,
        name: user.name,
        surname: user.surname,
        fathername: user.fathername,
        birthdate: user.birthdate,
        school: user.school,
        address: user.address,
        role: user.role,
        photoURL: user.photoURL,
        isActive: user.isActive,
        groups: user.groups,
      },
    };
  }
}
