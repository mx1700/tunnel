import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { LogData } from './data';

@Injectable()
export class AppService {
  listen: Map<string, Set<Socket>> = new Map();

  constructor() {
    setInterval(() => {
      const data = LogData();
      this.emitMessage('test', data);
    }, 3000);
  }

  getHello(): string {
    return 'Hello World!';
  }

  emitMessage(username: string, body: any) {
    //不阻塞尽早返回
    setTimeout(() => {
      if (this.listen.has(username)) {
        this.listen
          .get(username)
          .forEach((client) => client.emit('onData', body));
      }
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
}
