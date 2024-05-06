import { Module } from '@nestjs/common';
import { EmailServiceModule } from './email-service/email-service.module';

@Module({
  imports: [EmailServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
