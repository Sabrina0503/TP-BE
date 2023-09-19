import { Injectable, NotFoundException } from '@nestjs/common';
const baseUrl = 'http://localhost:3030/rutinas/';
import { Rutina } from './rutina.interface';
import { RutinaDto } from './rutina.dto';

@Injectable()
export class RutinaService {
  async getRutinas(): Promise<Rutina[]> {
    const res = await fetch(baseUrl);
    if (!res.ok) throw new NotFoundException();
    const parsed = res.json();
    return parsed;
  }

  async getRutinaById(id: number): Promise<Rutina> {
    const res = await fetch(baseUrl + id);
    const parsed = await res.json();
    if (Object.keys(parsed).length) return parsed;
    throw new NotFoundException(`La rutina con el id ${id} no existe`);
  }

  async getRutinasByTitle(title: string): Promise<any> {
    const allRutinasByTitle = await this.getRutinas();
    const filterByTitle = allRutinasByTitle.filter((ttle: Rutina) =>
      ttle.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()),
    );
    if (!filterByTitle.length)
      throw new NotFoundException(`No se encontro la rutina: ${title}`);
    return filterByTitle;
  }

  async getRutinasByPersonalTrainer(personalTrainer: string): Promise<any> {
    const allRutinasByPersonalTrainer = await this.getRutinas();
    const filterByPersonalTrainer = allRutinasByPersonalTrainer.filter(
      (pTrainer: Rutina) =>
        pTrainer.personalTrainer
          .toLocaleLowerCase()
          .includes(personalTrainer.toLocaleLowerCase()),
    );
    if (!filterByPersonalTrainer.length)
      throw new NotFoundException(
        `No se encontro al personalTrainer: ${personalTrainer}`,
      );
    return filterByPersonalTrainer;
  }

  async createRutina(rutina: RutinaDto): Promise<Rutina> {
    const id = await this.setId();
    const { title, duration, personalTrainer, description } = rutina;
    const newRutina = { id, title, personalTrainer, duration, description };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRutina),
    });
    const parsed = res.json();
    return parsed;
  }

  private async setId(): Promise<number> {
    const rutinas = await this.getRutinas();
    const id = rutinas.pop().id + 1;
    return id;
  }

  async updateRutinaById(id: number, body: Rutina) {
    const isRutina = await this.getRutinaById(id);
    if (!Object.keys(isRutina).length) return;
    const updateRutina = {
      title: body.title,
      description: body.description,
      duration: body.duration,
      personalTrainer: body.personalTrainer,
    };
    const res = await fetch(baseUrl + id, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateRutina),
    });
    const parsed = res.json();
    return parsed;
  }
  async deleteRutinakById(id: number) {
    const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }
}
