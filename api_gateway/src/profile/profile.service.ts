import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ProfileService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'profile_service_queue',
      },
    });
  }
  // Profile Service
  public getProfile(userId) {
    return this.client.send('getProfile', userId);
  }
  public createProfile(userId, data) {
    return this.client.send('createProfile', { userId, data });
  }
  public updateProfile(userId, data) {
    return this.client.send('updateProfile', { userId, data });
  }
  // interest Service
  public getInterest(userId) {
    return this.client.send('getInterest', userId);
  }
  public addInterest(userId: string, interestName: string[]) {
    return this.client.send('addInterest', { userId, interestName });
  }
  public removeInterest(userId, interestId) {
    return this.client.send('removeInterest', { userId, interestId });
  }
}
