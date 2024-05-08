import { Controller, Post, Body } from '@nestjs/common';
import { TextMessageServiceService } from './text-message-service.service';
import { CreateTextMessageServiceDto } from './dto/create-text-message-service.dto';

@Controller('text-message-service')
export class TextMessageServiceController {
  constructor(
    private readonly textMessageServiceService: TextMessageServiceService,
  ) {}

  @Post()
  async create(
    @Body() createTextMessageServiceDto: CreateTextMessageServiceDto,
  ) {
    return await this.textMessageServiceService.create(
      createTextMessageServiceDto,
    );
  }
}
