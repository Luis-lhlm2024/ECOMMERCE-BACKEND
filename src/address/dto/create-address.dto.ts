import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {

    @IsString()
    @IsNotEmpty()
    address:string;

    @IsString()
    @IsNotEmpty()
    neighborhood:string;

    @IsNotEmpty()
    id_user: number
    
}