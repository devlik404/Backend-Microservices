import { Controller, Get, Post, Request } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('hello')
  getHello(): any {
    return this.accountService.hello();
  }
  @Post('sign-up')
  async register(@Request() req) {
    return this.accountService.register(req.body);
  }

  @Post('sign-in')
  async login(@Request() req) {
    return this.accountService.login(req.body);
  }
}
