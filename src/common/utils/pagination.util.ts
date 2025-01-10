import { PaginationDto } from "src/modules/categories/dto/pagination.dto";

export function PaginationStructureSolver(paginationDto : PaginationDto) {
    let {limit = 10, page = 0} = paginationDto;
    if(!page || page <= 0) page = 0;
    else page = page - 1;
    if(!limit || limit <= 0) limit = 10;
    
    let skip = page * limit;
    return {
        skip,
        page : page === 0 ? 1 : page,
        limit
    } 
}

export function paginationGenerator(count : number = 0 , limit : number = 0, page : number = 0 ) {
    return {
        totalCount : count,
        pageCount : Math.ceil(page),
        limit,
        page
    }
}