import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";

export class QueryPagesDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  sectionLabel?: string;
}
