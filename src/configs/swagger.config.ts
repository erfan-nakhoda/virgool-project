import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function SwaggerConfig(app : INestApplication) : void {
    const document  = new DocumentBuilder()
    .setTitle("Virgool Project")
    .setDescription("Virgool website where you can publish ideas that you have.")
    .setVersion('v1.0.0')
    .build()
    const swaggerDoc = SwaggerModule.createDocument(app, document);
    SwaggerModule.setup("/swagger", app, swaggerDoc);

}