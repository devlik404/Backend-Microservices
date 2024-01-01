import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [AccountModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
