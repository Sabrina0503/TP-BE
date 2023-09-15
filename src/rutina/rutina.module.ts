import { Module } from '@nestjs/common';
import { RutinaController } from './rutina.controller';
import { RutinaService } from './rutina.service';
@Module({
  controllers: [RutinaController],
  providers: [RutinaService],
})
export class RutinaModule {}
