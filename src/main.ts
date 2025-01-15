import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './configs/swagger.config';
import * as cookieParser from "cookie-parser"
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  SwaggerConfig(app);
  app.useStaticAssets("public")
  //for using the validate decorators that we defined for Dtos which we have defined.
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(process.env.COOKIE_SECRET))
  await app.listen(process.env.PORT ?? 3000,() =>{
    console.log(`run : http://localhost:${process.env.PORT}`);
    console.log(`swagger : http://localhost:${process.env.PORT}/swagger`);
    
  });
}
bootstrap();
