import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in.dto';

import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { LoggedInUserDto } from './dto/logged-in.user.dto';

@ApiTags('Groups')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({ description: 'Groups are not found' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ description: 'Signing in' })
  @ApiCreatedResponse({
    description: 'User has been successfully signed in',
    type: LoggedInUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Email or password are incorrect',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  // TODO: add signUp/signOut
}
