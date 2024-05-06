export class ApiResponseDto<T> {
  readonly success: boolean = true;
  readonly data: T | null;
  readonly message: string | null;

  public constructor(b: Partial<ApiResponseDto<T>> = {}) {
    Object.assign(this, b);
  }
}
