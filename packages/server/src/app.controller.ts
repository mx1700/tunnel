import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestInfoDto } from './request-info.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/logRequest/:user')
  logRequest(
    @Param('user') user: string,
    @Body() info: RequestInfoDto,
  ): string {
    this.appService.emitMessage(user, info);
    return 'OK';
  }
}
