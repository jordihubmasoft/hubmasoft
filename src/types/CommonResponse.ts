export interface CommonResponse<T> {
  result: ErrorResponse;
  data: any;
}

interface ErrorResponse {
  resultNumber: number;
  errorMessage: string;
}
