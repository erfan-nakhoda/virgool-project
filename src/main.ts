import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './configs/swagger.config';
import * as cookieParser from "cookie-parser"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig(app);
  app.use(cookieParser(process.env.COOKIE_SECRET))
  
  await app.listen(process.env.PORT ?? 3000,() =>{
    console.log(`run : http://localhost:${process.env.PORT}`);
    console.log(`swagger : http://localhost:${process.env.PORT}/swagger`);
    
  });
}
bootstrap();
