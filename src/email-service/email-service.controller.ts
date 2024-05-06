import { Controller, Post, Body } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';
import { CreateEmailServiceDto } from './dto/create-email-service.dto';

@Controller('email-service')
export class EmailServiceController {
  constructor(private readonly emailServiceService: EmailServiceService) {}

  @Post()
  async create(@Body() createEmailServiceDto: CreateEmailServiceDto) {
    return await this.emailServiceService.sendEmail(createEmailServiceDto);
  }
}
