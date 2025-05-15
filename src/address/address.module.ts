import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './dto/address.entity';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports: [ TypeOrmModule.forFeature([Address, User]) ],
  providers: [AddressService, JwtStrategy],
  controllers: [AddressController]
})
export class AddressModule {}
