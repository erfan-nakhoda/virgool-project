import { BaseEntity } from "src/common/abstract/base.entity";
import { Entities } from "src/common/enums/entity.enum";
import { Entity } from "typeorm";
@Entity(Entities.BlogCategory)
export class BlogCategory extends BaseEntity {
    
}