export class RequestInfoDto {
  requestId: string;
  domain: string;
  method: string;
  path: string;
  duration: number;
  time: number;
  request: any;
  response: any;
}
