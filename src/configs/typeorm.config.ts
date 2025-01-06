import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function TypeOrmConfig() : TypeOrmModuleOptions {
    const {DB_HOST,DB_PASSWORD,DB_NAME,DB_PORT,DB_USERNAME} = process.env;
    return {
        type : "postgres",
        host :DB_HOST,
        username:DB_USERNAME,
        password : DB_PASSWORD,
        database : DB_NAME,
        port : DB_PORT,
        autoLoadEntities : false,
        synchronize : true,
        entities : [
            "dist/**/**/**/*.entity{.ts,.js}",
            "dist/**/**/*.entity{.ts,.js}"
        ]
    }
}