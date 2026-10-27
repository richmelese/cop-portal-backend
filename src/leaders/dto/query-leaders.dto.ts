import { IsIn, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
import { LEADER_COLORS } from "./create-leader.dto";

export class QueryLeadersDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsIn(LEADER_COLORS)
  color?: string;
}
