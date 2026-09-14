import { Module } from '@nestjs/common';
import { RatesModule } from './rates/rates.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
@Module({
  imports: [RatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
