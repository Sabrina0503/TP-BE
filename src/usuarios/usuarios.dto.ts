import { IsString, IsNumber, isEmail, isString } from 'class-validator';

export class UsuarioDto {
@IsString()
nombre: string;
@IsString()
apellido: string;
@IsNumber()
edad: number;
@IsString()
mail: string;
}

