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
      if (!createEmailServiceDto.email) {
        throw new HttpException('email is required', HttpStatus.BAD_REQUEST);
      }

      if (createEmailServiceDto.type === EMAIL_TYPES.course_registration) {
        if (
          !createEmailServiceDto.courseId ||
          !createEmailServiceDto.courseName
        ) {
          throw new HttpException(
            'courseId and courseName are required',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else if (
        createEmailServiceDto.type === EMAIL_TYPES.new_user_registration
      ) {
        if (!createEmailServiceDto.name) {
          throw new HttpException('name is required', HttpStatus.BAD_REQUEST);
        }
      }

      sgMail.setApiKey(configData.sendGrid.key);
      const msg = {
        to: createEmailServiceDto.email,
        from: {
          name: configData.sendGrid.appName,
          email: configData.sendGrid.sender,
        },

        templateId:
          createEmailServiceDto.type === EMAIL_TYPES.new_user_registration
            ? configData.sendGrid.designIds.registerNewUser
            : createEmailServiceDto.type === EMAIL_TYPES.course_registration
              ? configData.sendGrid.designIds.courseRegistration
              : undefined,

        dynamicTemplateData: {
          // TODO: change this
          btnURL:
            createEmailServiceDto.type === EMAIL_TYPES.new_user_registration
              ? `${configData.baseUrls.frontend}`
              : createEmailServiceDto.type === EMAIL_TYPES.course_registration
                ? `${configData.baseUrls.frontend}/courses/${createEmailServiceDto.courseId}`
                : '',
          name:
            createEmailServiceDto.type === EMAIL_TYPES.new_user_registration
              ? createEmailServiceDto.name
              : createEmailServiceDto.type === EMAIL_TYPES.course_registration
                ? createEmailServiceDto.courseName
                : '',

          subjectName:
            createEmailServiceDto.type === EMAIL_TYPES.new_user_registration
              ? `Welcome to ${configData.sendGrid.appName}`
              : createEmailServiceDto.type === EMAIL_TYPES.course_registration
                ? `You have Enrolled to ${createEmailServiceDto.courseName}`
                : `${configData.sendGrid.appName}`,
        },
      };
      await sgMail.send(msg);

      return new ApiResponseDto<null>({
        message: 'Email sent successfully',
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
