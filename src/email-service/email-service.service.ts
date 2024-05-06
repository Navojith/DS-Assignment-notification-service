import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmailServiceDto } from './dto/create-email-service.dto';
import * as sgMail from '@sendgrid/mail';
import configData from 'src/config/config';
import { EMAIL_TYPES } from 'src/common/constants';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

@Injectable()
export class EmailServiceService {
  async sendEmail(createEmailServiceDto: CreateEmailServiceDto) {
    try {
      sgMail.setApiKey(configData.sendGrid.key);
      const msg = {
        to: createEmailServiceDto.email,
        from: configData.sendGrid.sender,
        subject:
          createEmailServiceDto.type === EMAIL_TYPES.new_user_registration
            ? `Welcome to ${configData.sendGrid.appName}`
            : createEmailServiceDto.type === EMAIL_TYPES.course_registration
              ? `Welcome to ${createEmailServiceDto.courseName || createEmailServiceDto.courseId}`
              : `${configData.sendGrid.appName}`,
        text: createEmailServiceDto.context || '',
        template_id:
          createEmailServiceDto.type === EMAIL_TYPES.new_user_registration
            ? configData.sendGrid.designIds.registerNewUser
            : createEmailServiceDto.type === EMAIL_TYPES.course_registration
              ? configData.sendGrid.designIds.courseRegistration
              : undefined,
      };
      await sgMail.send(msg);

      return new ApiResponseDto<null>({
        message: 'Email sent successfully',
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
