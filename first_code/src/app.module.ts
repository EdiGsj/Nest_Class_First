import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './Database/prisma.service';
import { AuthService } from './Services/auth';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
        secret: 'Segredo', 
        signOptions: { expiresIn: '1h' },
    }),
  ],

  controllers: [AppController],
  providers: [PrismaService, AuthService, JwtService],
})
export class AppModule {}
