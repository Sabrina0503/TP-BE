import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { Rutina } from './rutina.interface';

@Controller('rutinas')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @Get()
  @HttpCode(203)
  getRutinas(
    @Query('personalTrainer') personalTrainer: string,
    @Query('title') title: string,
  ): Promise<Rutina[]> {
    if (!personalTrainer && !title) return this.rutinaService.getRutinas();
    if (!personalTrainer) {
      return this.rutinaService.getRutinasByTitle(title);
    } else {
      return this.rutinaService.getRutinasByPersonalTrainer(personalTrainer);
    }
  }

  @Get('/:id')
  async getRutinaById(@Param('id', ParseIntPipe) id: number): Promise<Rutina> {
    return this.rutinaService.getRutinaById(id);
  }

  @Post()
  createRutina(@Body() body): Promise<any> {
    return this.rutinaService.createRutina(body);
  }

  @Delete('/:id')
  deleteRutinakById(@Param('id') id: number): Promise<void> {
    return this.rutinaService.deleteRutinakById(id);
  }

  @Put('/:id')
  @HttpCode(203)
  updateRutina(@Param('id') id: number, @Body() body): Promise<void> {
    return this.rutinaService.updateRutinaById(id, body);
  }
}
