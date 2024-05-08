import { Module } from '@nestjs/common';
import { TextMessageServiceService } from './text-message-service.service';
import { TextMessageServiceController } from './text-message-service.controller';
import { HttpModule } from '@nestjs/axios';
import { APIRequestService } from 'src/common/services/api-request.service';

@Module({
  imports: [HttpModule],
  controllers: [TextMessageServiceController],
  providers: [APIRequestService, TextMessageServiceService],
})
export class TextMessageServiceModule {}
