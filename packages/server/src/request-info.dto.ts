export class RequestInfoDto {
  user: {
    username: string;
  };
  data: {
    requestId: string;
    domain: string;
    method: string;
    path: string;
    duration: number;
    time: number;
    request: {
      query: string;
      body: any;
      headers: Record<string, string>;
    };
    response: {
      body: any;
      headers: Record<string, string>;
    };
  };
}
