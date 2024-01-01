import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  getHello() {
    return 'hello';
  }
  @MessagePattern('getProfile')
  async getProfile(userId) {
    return this.appService.getProfile(userId);
  }
  @MessagePattern('createProfile')
  async createProfile(payload: { userId: string; data: any }) {
    return this.appService.createOrUpdateProfile(payload);
  }
  @MessagePattern('updateProfile')
  async updateProfile(payload: { userId: string; data: any }) {
    return this.appService.updateProfile(payload);
  }
  // patternInterest
  @MessagePattern('getInterest')
  async getInterest(userId) {
    return this.appService.getInterest(userId);
  }
  @MessagePattern('addInterest')
  async addInterest(payload: { userId: string; interestName: string[] }) {
    return this.appService.addInterest(payload);
  }
  @MessagePattern('removeInterest')
  async removeInterest(payload: { userId: string; interestId: string }) {
    return this.appService.removeInterest(payload);
  }
}
