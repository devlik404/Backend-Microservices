import { Controller } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('identity')
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @MessagePattern('helloFromApi')
  hello(req) {
    return this.identityService.hello(req);
  }
  @MessagePattern('register')
  async register(command) {
    return this.identityService.register(command);
  }
  @MessagePattern('login')
  async login(command) {
    return this.identityService.login(command);
  }
}
