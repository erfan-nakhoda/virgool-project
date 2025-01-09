import { BaseEntity } from "src/common/abstract/base.entity";
import { Entities } from "src/common/enums/entity.enum";
import { Column, Entity } from "typeorm";
@Entity(Entities.Profile)
export class ProfileEntity extends BaseEntity {
    @Column({nullable : true})
    nick_name : string
    @Column({nullable : true})
    bio : string
    @Column({nullable : true})
    image_profile : string
    @Column({nullable : true})
    bg_image : string
    @Column({nullable : true})
    gender : string
    @Column()
    birthDate : Date
    @Column()
    linkedin_profile : string
}