import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
const baseUrl = 'http://localhost:3030/usuarios/';
import { Usuario } from './usuarios.interface';

@Injectable()
export class UsuarioService {
  async getUsuarios(): Promise<Usuario[]> {
    const res = await fetch(baseUrl);
    const parsed = res.json();
    return parsed;
  }

  /* Trae al usuario por su ID */
  async getUsuarioById(id: number): Promise<Usuario> {
    const res = await fetch(baseUrl + id);
    const parsed = res.json();
    if (Object.keys(parsed).length) return parsed;
    throw new NotFoundException(`El Usuario con el id ${id} no existe`);
  }

  /* Trae al usuario por su Email */
  async getUsuarioByMail(mail: string): Promise<Usuario[]> {
    const allUsuarios = await this.getUsuarios();
    const filteredByMail = allUsuarios.filter((us: Usuario) =>
      us.mail.toLocaleLowerCase().includes(mail.toLocaleLowerCase()),
    );
    if (!filteredByMail.length) throw new NotFoundException(
      `No se encontro el siguiente mail: ${mail}`,
    );
    return filteredByMail;
  }

  /* Trae al usuario por su apellido */
  async getUsuarioByApellido(apellido: string): Promise<Usuario[]> {
    const allUsuarios = await this.getUsuarios();
    const filteredByApellido = allUsuarios.filter((us: Usuario) =>
      us.apellido.toLocaleLowerCase().includes(apellido.toLocaleLowerCase()),
    );
    if (!filteredByApellido.length) throw new NotFoundException(  
      `No se encontro el siguiente apellido: ${apellido}`,);
    return filteredByApellido;
  }

  /* Crea un usuario nuevo */
  async createNewUsuario(Usuario: Usuario) {
    const id = await this.setId();
    const newUsuario = { ...Usuario, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify(newUsuario),
      },
    });
    const parsed = res.json();
    return parsed;
  }

  /* Metodo para generar id */
  private async setId(): Promise<number> {
    const usuario = await this.getUsuarios();
    const id = usuario.pop().id + 1;
    return id;
  }

  /* Borra un Usuario por su ID */
  async deleteUsuarioById(id: number) {
    const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }

  /* Actualiza un Usuario por id */
  async updateUsuarioById(id: number, body: Usuario): Promise<void> {
    const isUsuario = await this.getUsuarioById(id);
    if (!Object.keys(isUsuario).length) return;
    const updatedUsuario = {
      nombre: body.nombre,
      apellido: body.apellido,
      edad: body.edad,
      mail: body.mail,
    };
    await fetch(baseUrl + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUsuario),
    });
  }
}
