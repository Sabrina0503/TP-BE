import {
  Res,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { Usuario } from './usuarios.interface';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly UsuarioService: UsuarioService) {}

  @Get()
  getUsuarios(): Promise<Usuario[]> {
    return this.UsuarioService.getUsuarios();
  }

  @Get('/:id')
  getUsuarioById(@Param('id') id: number): Promise<Usuario> {
    return this.UsuarioService.getUsuarioById(id);
  }
  @Post()
  createNewUsuario(@Body() body): Promise<any> {
    return this.UsuarioService.createNewUsuario(body);
  }

  @Delete('/:id')
  deleteUsuarioById(@Param('id') id: number): Promise<void> {
    return this.UsuarioService.deleteUsuarioById(id);
  }

  @Put('/:id')
  @HttpCode(204)
  updateUsuarioById(@Param('id') id: number, @Body() body): Promise<void> {
    return this.UsuarioService.updateUsuarioById(id, body);
  }

  private async setId(): Promise<number> {
    const usuarios = await this.getUsuarios();
    const id = usuarios.pop().id + 1;
    return id;
  }
}
