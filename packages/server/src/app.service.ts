import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class AppService {
  listen: Map<string, Set<Socket>> = new Map();

  getHello(): string {
    return 'Hello World!';
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
