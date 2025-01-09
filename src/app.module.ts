import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath : join(process.cwd(), ".env"),
    isGlobal : true
  }),AuthModule,UserModule,TypeOrmModule.forRoot(TypeOrmConfig()),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
