import { randomInt, randomUUID } from 'crypto';
import { RequestInfoDto } from './request-info.dto';
const methods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTION'];
export function LogData(): RequestInfoDto {
  return {
    user: {
      username: 'test',
    },
    data: {
      requestId: randomUUID().toString(),
      domain: 'localhost',
      method: methods[Math.floor(Math.random() * methods.length)],
      path: '/blocks/' + randomUUID(),
      duration: randomInt(5, 500),
      time: new Date().getTime(),
      request: {
        query: 'a=1&b=2&c=' + randomUUID(),
        headers: {
          'x-header': '111',
        },
        body: {
          a: 1,
          b: '2',
          c: [1, 2, 3],
          d: {
            e: 999,
          },
        },
      },
      response: {
        headers: {},
        body: {
          code: 200,
          message: 'OK',
          data: {},
        },
      },
    },
  };
}
