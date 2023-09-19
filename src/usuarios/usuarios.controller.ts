import { Usuario } from './usuarios.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsuarioDto } from './usuarios.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly UsuarioService: UsuarioService) {}

  @Get()
  @HttpCode(203)
  getUsuarios(
    @Query('apellido') apellido: string,
    @Query('mail') mail: string,
  ): Promise<Usuario[]> {
    if (!apellido && !mail) return this.UsuarioService.getUsuarios();
    if (!apellido) {
      return this.UsuarioService.getUsuarioByApellido(apellido);
    } else {
      return this.UsuarioService.getUsuarioByMail(mail);
    }
  }

  @Get('/:id')
  getUsuarioById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.UsuarioService.getUsuarioById(id);
  }
  @Post()
  createNewUsuario(@Body() usuarioDto:UsuarioDto): Promise<any> {
    console.log(usuarioDto)
    return this.UsuarioService.createNewUsuario(usuarioDto);
  }

  @Delete('/:id')
  deleteUsuarioById(@Param('id') id: number): Promise<void> {
    console.log(`El Usuario con el id ${id} ha sido eliminado`)
    return this.UsuarioService.deleteUsuarioById(id);
  }

  @Put('/:id')
  @HttpCode(204)
  updateUsuarioById(@Param('id') id: number, @Body() body): Promise<void> {
    return this.UsuarioService.updateUsuarioById(id, body);
  }
}
