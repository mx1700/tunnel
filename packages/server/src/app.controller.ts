import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestInfoDto } from './request-info.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('/logRequest')
  logRequest(@Body() info: RequestInfoDto): string {
    this.appService.emitMessage(info.user.username, info.data);
    return 'OK';
  }
}
