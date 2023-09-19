import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { Rutina } from './rutina.interface';
import { RutinaDto } from './rutina.dto';

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
    if (!personalTrainer) return this.rutinaService.getRutinasByTitle(title);
    if (!title)
      return this.rutinaService.getRutinasByPersonalTrainer(personalTrainer);
  }

  @Get(':id')
  async getRutinaById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<Rutina> {
    return this.rutinaService.getRutinaById(id);
  }

  @Post()
  createRutina(@Body() rutinaDto: RutinaDto): Promise<any> {
    console.log(rutinaDto);
    return this.rutinaService.createRutina(rutinaDto);
  }

  @Delete('/:id')
  deleteRutinakById(@Param('id') id: number): Promise<void> {
    console.log(`la rutina con el id ${id} ha sido eliminada`);
    return this.rutinaService.deleteRutinakById(id);
  }

  @Put('/:id')
  @HttpCode(203)
  updateRutina(@Param('id') id: number, @Body() body): Promise<void> {
    return this.rutinaService.updateRutinaById(id, body);
  }
}
