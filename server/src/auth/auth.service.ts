import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const user = await this.usersService.findUserByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      // TODO: add refresh token
      user: {
        id: user.id,
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
