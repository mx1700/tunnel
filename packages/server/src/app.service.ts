import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { LogData } from './data';
import { RequestInfoDto } from './request-info.dto';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  listen: Map<string, Set<Socket>> = new Map();

  constructor(private readonly db: PrismaService) {
    setInterval(() => {
      const data = LogData();
      this.emitMessage('test', data);
    }, 3000);
  }

  getHello(): string {
    return 'Hello World!';
  }

  emitMessage(username: string, body: RequestInfoDto) {
    //不阻塞尽早返回
    setTimeout(() => {
      if (this.listen.has(username)) {
        this.listen
          .get(username)
          .forEach((client) => client.emit('onData', body.data));
      }
      this.saveRequest(body);
    }, 0);
  }

  addListener(client: Socket): void {
    const username = client.handshake.query.username as string;
    if (!username) {
      return;
    }
    if (!this.listen.has(username)) {
      this.listen.set(username, new Set());
    }
    this.listen.get(username).add(client);
  }

  removeListener(client: Socket): void {
    const username = client.handshake.query.username as string;
    if (!username) {
      return;
    }
    if (this.listen.has(username)) {
      const set = this.listen.get(username);
      set.delete(client);
      if (set.size === 0) {
        this.listen.delete(username);
      }
    }
  }

  async saveRequest(req: RequestInfoDto) {
    await this.db.request.create({
      data: {
        id: randomUUID().toString(),
        username: req.user.username,
        requestId: req.data.requestId,
        domain: req.data.domain,
        method: req.data.method,
        path: req.data.path,
        duration: req.data.duration,
        time: new Date(req.data.time),
        request: JSON.stringify(req.data.request),
        response: JSON.stringify(req.data.response),
      },
    });
  }
}
