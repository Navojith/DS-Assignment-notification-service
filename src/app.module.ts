import { Module } from '@nestjs/common';
import { EmailServiceModule } from './email-service/email-service.module';
import { TextMessageServiceModule } from './text-message-service/text-message-service.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [EmailServiceModule, TextMessageServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
