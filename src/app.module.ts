import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RutinaController } from './rutina/rutina.controller';
import { RutinaService } from './rutina/rutina.service';
import { RutinaModule } from './rutina/rutina.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
    RutinaModule,
  ],
  controllers: [AppController, RutinaController],
  providers: [AppService, RutinaService],
})
export class AppModule {}
