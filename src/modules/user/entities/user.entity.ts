import { BaseEntity } from "src/common/abstract/base.entity";
import { Entities } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";
import { ProfileEntity } from "./profile.entity";

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
    @Column({nullable : true})
    new_email : string
    @Column({nullable : true})
    new_phone : string
    @Column({nullable : true})
    verify_email : boolean
    @Column({nullable : true})
    verify_phone : boolean
    @CreateDateColumn()
    created_at : Date
    @UpdateDateColumn()
    updated_at : Date
    @OneToOne(()=> OtpEntity, otp => otp.user, {nullable : true})
    @JoinColumn()
    otp : OtpEntity
    @Column({nullable : true})
    profileId : number
    @OneToOne(() => ProfileEntity, profile => profile.user)
    profile : ProfileEntity
}
