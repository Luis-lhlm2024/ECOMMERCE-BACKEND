import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {

    constructor (private AuthService: AuthService){}
    @Post('register') //http://localhost/auth/register
    register(@Body() user: RegisterAuthDto){
        return this.AuthService.register(user);
    }


    @Post('login') //http://localhost/auth/login -> POST
    login(@Body() loginData: LoginAuthDto){
        return this.AuthService.login(loginData);
    }
}
