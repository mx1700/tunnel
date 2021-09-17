import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { LogData } from './data';

@Injectable()
export class AppService {
  listen: Map<string, Set<Socket>> = new Map();

  constructor() {
    setInterval(() => {
      this.emitMessage('1', LogData());
    }, 1000);
  }

  getHello(): string {
    return 'Hello World!';
  }

  emitMessage(phone: string, body: any) {
    //不阻塞尽早返回
    setTimeout(() => {
      if (this.listen.has(phone)) {
        this.listen.get(phone).forEach((client) => client.emit('onData', body));
      }
    }, 0);
  }

  addListener(client: Socket): void {
    const phone = client.handshake.query.phone as string;
    if (!phone) {
      throw new Error('没有 Phone 参数');
    }
    if (!this.listen.has(phone)) {
      this.listen.set(phone, new Set());
    }
    this.listen.get(phone).add(client);

    console.log(this.listen);
  }

  removeListener(client: Socket): void {
    const phone = client.handshake.query.phone as string;
    if (!phone) {
      throw new Error('没有 Phone 参数');
    }
    if (this.listen.has(phone)) {
      const set = this.listen.get(phone);
      set.delete(client);
      if (set.size === 0) {
        this.listen.delete(phone);
      }
    }
    console.log(this.listen);
  }
}
