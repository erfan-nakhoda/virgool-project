import { BaseEntity } from "src/common/abstract/base.entity";
import { Entities } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";

@Entity(Entities.User)
export class UserEntity extends BaseEntity{
    @Column({unique : true,nullable : true})
    username : string
    @Column({unique : true, nullable : true})
    phone: string
    @Column({nullable : true})
    password : string
    @Column({unique : true, nullable : true})
    email: string
    @Column({nullable : true})
    otpId : number
    @CreateDateColumn()
    created_at : Date
    @UpdateDateColumn()
    updated_at : Date
    @OneToOne(()=> OtpEntity, otp => otp.user, {nullable : true})
    @JoinColumn()
    otp : OtpEntity
}
