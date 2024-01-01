import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from './profile.guard';
import { ProfileDto } from './profile.dto';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  // route Profile
  @Get('getProfile')
  async getProfile(@Request() req) {
    const userId = req.user.id;
    return this.profileService.getProfile(userId);
  }

  @Post('createProfile')
  async createProfile(@Request() req, @Body() data: ProfileDto) {
    const userId = req.user.id;
    return this.profileService.createProfile(userId, data);
  }

  @Put('updateProfile')
  async updateProfile(@Request() req, @Body() data: ProfileDto) {
    const userId = req.user.id;
    return this.profileService.updateProfile(userId, data);
  }
  // route interest
  @Get('getInterest')
  async getInterest(@Request() req) {
    const userId = req.user.id;
    return this.profileService.getInterest(userId);
  }
  @Post('addInterest')
  async addInterest(
    @Request() req,
    @Body('interestName') interestName: string[],
  ) {
    const userId = req.user.id;
    return this.profileService.addInterest(userId, interestName);
  }
  @Delete('removeInterest/:interestId')
  async removeInterest(
    @Request() req,
    @Param('interestId') interestId: string,
  ) {
    const userId = req.user.id;
    return this.profileService.removeInterest(userId, interestId);
  }
}
