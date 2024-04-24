import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { PrismaService } from './Database/prisma.service'
import { Create } from './DTOS/create_user';
import { AuthService } from './Services/auth';

@Controller('user/') //Hiperlink;
export class AppController {
  constructor(private prisma: PrismaService, private readonly authService: AuthService){}

  @Get('hello')
  getHello(){
    return {mensage: 'hello, world!'};
  };

  @Get('all')
  async get_all_user(){
    return await this.prisma['Usuario'].findMany()
  };

  @Get(':id')
  async get_one(@Param('id') id: string){
    return await this.prisma['Usuario'].findUnique({where: {id:+id}})
  };

  @Post('register')
  async postUser(@Body() body: Create){
    const {name, email} = body;
    const usuario = await this.prisma['Usuario'].create({data: {
      name, email
    }})
    return {usuario};
  };

  @Post('login')
  async login_user(@Body() data: {email: string}){
    return await this.authService.login(data.email)
  };

  @Put('update/:id')
  async update_user(
    @Param('id') id: string, 
    @Body() data: { name?: string; email?: string }
  ){
    return await this.prisma['Usuario'].update({where: {id:+id}, data})
  };

  @Delete(':id')
  async del_one(@Param('id') id: string){
    return await this.prisma['Usuario'].delete({where: {id:+id}})
  };

};
