import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";

export class QueryNewsDto extends PaginationQueryDto {
  // search matches against title or excerpt text.
  @IsOptional()
  @IsString()
  category?: string;
}
