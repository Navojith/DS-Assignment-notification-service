import { Test, TestingModule } from '@nestjs/testing';
import { TextMessageServiceController } from './text-message-service.controller';
import { TextMessageServiceService } from './text-message-service.service';

describe('TextMessageServiceController', () => {
  let controller: TextMessageServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextMessageServiceController],
      providers: [TextMessageServiceService],
    }).compile();

    controller = module.get<TextMessageServiceController>(TextMessageServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
