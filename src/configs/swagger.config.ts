import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function SwaggerConfig(app : INestApplication) : void {
    const document  = new DocumentBuilder()
    .setTitle("Virgool Project")
    .setDescription("Virgool website where you can publish ideas that you have.")
    .addBearerAuth(SwaggerAuthConfig(), "Authorization")
    .setVersion('v1.0.0')
    .build()
    const swaggerDoc = SwaggerModule.createDocument(app, document);
    SwaggerModule.setup("/swagger", app, swaggerDoc);

}
function SwaggerAuthConfig(): SecuritySchemeObject {
    return {
        type : "http",
        bearerFormat : "JWT",
        in : "header",
        scheme : "bearer"
    }
}