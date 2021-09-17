import { randomUUID } from 'crypto';

export function LogData() {
  return {
    requestId: randomUUID(),
    domain: 'http://localhost:8080',
    method: 'POST',
    path: '/blocks/' + randomUUID(),
    duration: 100,
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
  };
}
