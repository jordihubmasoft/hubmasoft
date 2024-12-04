// src/types/CommonResponse.ts

export interface CommonResponse<T> {
  result: {
    resultNumber: number;
    errorMessage: string;
  };
  data: T;
}

interface ErrorResponse {
  resultNumber: number;
  errorMessage: string;
}
