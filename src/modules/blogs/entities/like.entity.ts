import { Entities } from "src/common/enums/entity.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { BaseEntity } from "src/common/abstract/base.entity";
@Entity(Entities.BlogLike)
export class BlogLikeEntity extends BaseEntity {
    @Column()
    blogId : number
    @Column()
    userId : number
    // @ManyToOne(() => UserEntity, user => user.blogLikes, {onDelete : "CASCADE"})
    // @JoinColumn({name : "userId"})
    user : UserEntity
    @ManyToOne(() => BlogEntity, blog => blog.likes, {onDelete : "CASCADE"}) 
    blog : BlogEntity
}