export class CreateEmailServiceDto {
  readonly type: string;
  readonly userId?: string;
  readonly email?: string;
  readonly courseId?: string;
  readonly courseName?: string;
  readonly context?: string;
}
