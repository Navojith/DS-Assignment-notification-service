export class CreateEmailServiceDto {
  readonly type: string;
  readonly email: string;
  readonly name?: string;
  readonly courseId?: string;
  readonly courseName?: string;
}
