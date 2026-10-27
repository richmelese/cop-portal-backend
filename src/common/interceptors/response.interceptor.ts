import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import type { PaginationMeta } from "../interfaces/paginated.interface";

export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

function isPaginatedShape(value: unknown): value is { data: unknown; meta: PaginationMeta } {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    "meta" in value &&
    typeof (value as Record<string, unknown>).meta === "object"
  );
}

/**
 * Wraps every controller response in a consistent { success, data, meta? }
 * envelope. A service that returns { data, meta } (paginated list endpoints)
 * has its meta lifted to the top level; everything else is wrapped as-is.
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((result) => {
        if (isPaginatedShape(result)) {
          return { success: true, data: result.data as T, meta: result.meta };
        }
        return { success: true, data: result };
      }),
    );
  }
}
