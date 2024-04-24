import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import { PrismaService } from 'src/Database/prisma.service';


@Injectable()
export class AuthService{
    constructor(private readonly jwtService: JwtService, private prisma: PrismaService){};
    async login(email: string) {
        const user = await this.prisma['Usuario'].findUnique({where: {email:email}});
        if (!user) {
          throw new UnauthorizedException('Credenciais inválidas');
        }
    
        const payload = { userId: user.id };
        // const token = this.jwtService.sign(payload);
    
        return {  access_token: this.jwtService.sign(payload) };
    };
};