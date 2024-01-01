import { Injectable } from '@nestjs/common';
import { Interest, Profile } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  hello(message) {
    console.log(message);
    return message;
  }
  async getProfile(userId): Promise<Profile | null> {
    console.log(userId);
    try {
      return await this.prisma.profile.findUnique({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async createOrUpdateProfile(payload): Promise<Profile | null> {
    console.log(payload);

    try {
      const {
        image,
        displayName,
        gender,
        birthday,
        horoscope,
        zodiac,
        height,
        weight,
      } = payload.data;
      const { userId } = payload;

      // Coba mencari profil yang sudah ada dengan userId
      const existingProfile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (existingProfile) {
        // Jika profil yang sudah ada ditemukan, perbarui
        const updatedProfile = await this.prisma.profile.update({
          where: { userId },
          data: {
            image,
            displayName,
            gender,
            birthday,
            horoscope,
            zodiac,
            height,
            weight,
          },
        });

        return updatedProfile;
      } else {
        // Jika tidak ada profil yang sudah ada, buat yang baru
        const createdProfile = await this.prisma.profile.create({
          data: {
            image,
            displayName,
            gender,
            birthday,
            horoscope,
            zodiac,
            height,
            weight,
            userId,
          },
        });

        return createdProfile;
      }
    } catch (error) {
      console.error('Error creating or updating profile:', error);
      return null;
    }
  }
  async updateProfile(payload): Promise<Profile | null> {
    console.log(payload);
    try {
      const { userId, data } = payload;
      return await this.prisma.profile.update({
        where: {
          userId,
        },
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  // service interest
  //GET
  async getInterest(userId): Promise<Interest | null> {
    try {
      return await this.prisma.interest.findFirst({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async addInterest(payload): Promise<Interest | null> {
    console.log(payload);
    try {
      const { userId, interestName } = payload;
      // Mengonversi array interestName menjadi string
      const formattedInterestName = interestName.join(', ');
      const existingInterest = await this.prisma.interest.findUnique({
        where: {
          userId,
        },
      });
      if (existingInterest) {
        const updatedInterest = await this.prisma.interest.update({
          where: { userId }, // Menggunakan where: { userId: userId } yang sesuai dengan tipe data
          data: {
            interest_name: formattedInterestName,
          },
        });
        return updatedInterest;
      } else {
        return await this.prisma.interest.create({
          data: {
            userId,
            interest_name: formattedInterestName,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async addInterest(payload): Promise<Interest | null> {
  //   console.log(payload);
  //   try {
  //     const { userId, interestName } = payload;
  //     // Mengonversi array interestName menjadi string
  //     const formattedInterestName = interestName.join(', ');
  //     const existingInterest = await this.prisma.interest.findFirst({
  //       where: {
  //         userId: userId,
  //       },
  //     });
  //     if (existingInterest) {
  //       const updatedInterest = await this.prisma.interest.update({
  //         where: { userId: userId },
  //         data: {
  //           interest_name: formattedInterestName,
  //         },
  //       });

  //       return updatedInterest;
  //     } else {
  //       return await this.prisma.interest.create({
  //         data: {
  //           userId,
  //           interest_name: formattedInterestName,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async removeInterest(payload): Promise<any> {
    console.log(payload);
    try {
      const { userId, interestId } = payload;
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          interests: {
            delete: { id: interestId },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
