import { BaseEntity } from "src/common/abstract/base.entity";
import { Entities } from "src/common/enums/entity.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity(Entities.Otp)
export class OtpEntity extends BaseEntity{
    @Column()
    code : string
    @Column()
    expiresIn : Date
    @Column()
    userId : number
    @OneToOne(() => UserEntity, user => user.otp, {onDelete : "CASCADE"})
    @JoinColumn()
    user : UserEntity
}
