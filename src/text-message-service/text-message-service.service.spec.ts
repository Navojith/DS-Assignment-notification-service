import { Test, TestingModule } from '@nestjs/testing';
import { TextMessageServiceService } from './text-message-service.service';

describe('TextMessageServiceService', () => {
  let service: TextMessageServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextMessageServiceService],
    }).compile();

    service = module.get<TextMessageServiceService>(TextMessageServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
