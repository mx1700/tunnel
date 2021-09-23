import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestInfoDto } from './request-info.dto';
import dayjs from 'dayjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('/logRequest')
  logRequest(@Body() info: RequestInfoDto): string {
    this.appService.emitMessage(info.user.username, info);
    return 'OK';
  }

  @Get('/searchHistory')
  search(
    @Query('username') username: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Query('keywords') keywords: string,
  ) {
    return this.appService.searchHistory(
      username,
      dayjs(startTime, 'YYYY-MM-DDTHH:mm').toDate(),
      dayjs(endTime, 'YYYY-MM-DDTHH:mm').toDate(),
      keywords,
    );
  }
}
