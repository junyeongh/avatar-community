import { AxiosError } from "axios";

export type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;
