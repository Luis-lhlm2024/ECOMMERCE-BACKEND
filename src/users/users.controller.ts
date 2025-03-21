import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles-guards';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';

@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService) { }

    //GET       -> OBTENER
    //POST      -> CREAR
    //PUT-PATCH -> ACTUALIZAR
    //DELETE    -> BORRAR


    @HasRoles(JwtRole.ADMIN, JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()// http://localhost/users
    findAll() {
        return this.UsersService.findAll();
    }

    @Post()// http://localhost/users
    create(@Body() user: CreateUserDto) {
        return this.UsersService.create(user);
    }

    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id')// http://192.168.48.252:3000/users/:id 
    update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.UsersService.update(id, user);
    }

    @HasRoles(JwtRole.ADMIN, JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            ],
        }),
    ) file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
        @Body() user: UpdateUserDto
    ) {

        return this.UsersService.updateWithImage(file, id, user);
    }
}
