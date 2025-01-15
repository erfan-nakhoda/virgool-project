import { MulterFile } from "src/common/utils/multer.utils"

export type FileType = {
    bg_image : MulterFile[],
    image_profile : MulterFile[],
}