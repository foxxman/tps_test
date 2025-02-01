import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PeriodsModule } from './modules/periods/periods.module';

@Module({
  imports: [AuthModule, PeriodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
