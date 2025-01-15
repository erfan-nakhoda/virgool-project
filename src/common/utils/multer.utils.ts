import { BadRequestException } from "@nestjs/common";
import e, { Request } from "express";
import { mkdirSync } from "fs";
import { extname, join } from "path";
import { ValidationMessage } from "../enums/message.enum";
import { diskStorage } from "multer";
type CbFunctionDestination = (err : Error, destination : string) => void;
type CbFunctionFileName = (err : Error, filename : string) => void;
export type  MulterFile = Express.Multer.File;
export function multerDestination(fieldName : string){
    return function (req : Request, file : MulterFile , cb : CbFunctionDestination) : void {
        const destination = join("public", "uploads", `${fieldName}`);
        mkdirSync(destination, {recursive : true});
        cb(null , destination);
    }
}

export function multerFileName (req : Request, file : MulterFile , cb : CbFunctionFileName) {
        const ext = extname(file.originalname).toLowerCase();
        if(!FormatFileValidation(ext)) cb(new BadRequestException(ValidationMessage.IncorrectFormatFile), null); 
        const name = `${Date.now()}${ext}`;
        cb(null, name)
    }

function FormatFileValidation(ext : string) {
    return [".jpg", ".jpeg", ".png"].includes(ext);
}

export function multerDiskStorage(fieldName : string){ return diskStorage({
      destination: multerDestination(fieldName),
      filename: multerFileName
    })}