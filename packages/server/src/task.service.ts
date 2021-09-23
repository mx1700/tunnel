import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly db: PrismaService) {}

  @Cron('0 0 * * *')
  async clearHistory() {
    const queryTime = dayjs().add(-2, 'minute').toDate();
    const r = await this.db.request.deleteMany({
      where: { time: { lt: queryTime } },
    });
    this.logger.log('Clear history: ' + r.count);
  }
}
