import { BaseEntity } from "src/common/abstract/base.entity";
import { Entities } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
@Entity(Entities.BlogComment)
export class BlogCommentEntity extends BaseEntity {
    @Column()
    text : string
    @Column()
    userId : number
    @Column()
    accepted : boolean
    @CreateDateColumn()
    created_at : Date
    @OneToMany(() => BlogCommentEntity, comment => comment.children)
    children : BlogCommentEntity
    @ManyToOne(() => BlogCommentEntity, comment => comment.parent)
    @JoinColumn({name : "parent"})
    parent : BlogCommentEntity[]
    @ManyToOne(() => BlogEntity, blog => blog.comments)
    blog : BlogEntity
    // @ManyToOne(() => UserEntity, user => user.blogComments)
    // @JoinColumn({name : "userId"})
    // user : UserEntity
}