import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTextMessageServiceDto } from './dto/create-text-message-service.dto';
import * as twilio from 'twilio';
import configData from 'src/config/config';
import { EMAIL_TYPES } from 'src/common/constants';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { APIRequestService } from 'src/common/services/api-request.service';

@Injectable()
export class TextMessageServiceService {
  constructor(private readonly apiRequestService: APIRequestService) {}

  async create(createTextMessageServiceDto: CreateTextMessageServiceDto) {
    try {
      if (!createTextMessageServiceDto.receiver) {
        throw new HttpException('receiver is required', HttpStatus.BAD_REQUEST);
      }
      if (!createTextMessageServiceDto.type) {
        throw new HttpException('type is required', HttpStatus.BAD_REQUEST);
      }
      if (
        createTextMessageServiceDto.type === EMAIL_TYPES.course_registration &&
        !createTextMessageServiceDto.courseName
      ) {
        throw new HttpException(
          'courseName is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const params = {
        user_id: configData.sms.uid,
        api_key: configData.sms.apiKey,
        sender_id: configData.sms.senderId,
        message:
          createTextMessageServiceDto.type === EMAIL_TYPES.new_user_registration
            ? `Welcome to ${configData.sendGrid.appName}`
            : createTextMessageServiceDto.type ===
                EMAIL_TYPES.course_registration
              ? `You have successfully registered for ${createTextMessageServiceDto.courseName}`
              : `${configData.sendGrid.appName}`,
        to: createTextMessageServiceDto.receiver,
      };

      const response = await this.apiRequestService.sendRequest(
        configData.sms.url,
        'get',
        {},
        params,
      );
      if (response?.statusCode === 200) {
        return new ApiResponseDto<null>({
          message: 'Message sent successfully',
        });
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        error.status ||
          error.response.status ||
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
