import { BaseEntity } from "src/common/abstract/base.entity";
import { Entities } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { Status } from "../enum/status.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BlogLikeEntity } from "./like.entity";
import { BlogBookMarkEntity } from "./bookmark.entity";
import { BlogCommentEntity } from "./comment.entity";
@Entity(Entities.Blog)
export class BlogEntity extends BaseEntity{
    @Column()
    title : string
    @Column()
    description : string
    @Column()
    content : string
    @Column({nullable : true})
    image : string
    @Column({unique : true})
    slug : string
    @Column()
    time_for_study : string
    @Column({enum : Status})
    status : string
    @Column()
    authorId : number
    // @ManyToOne(() => UserEntity, user => user.blogs, {onDelete : "CASCADE"})
    // @JoinColumn({name : "authorId"})
    // author : UserEntity
    @OneToMany(() => BlogLikeEntity, likes => likes.blog)
    likes : BlogLikeEntity[]
    @OneToMany(() => BlogBookMarkEntity, bookmark => bookmark.blog)
    bookmarks : BlogBookMarkEntity[]
    @OneToMany(() => BlogCommentEntity, comment => comment.blog)
    comments : BlogCommentEntity[]
    @CreateDateColumn()
    created_at : Date
    @UpdateDateColumn()
    updated_at : Date


}
