import type { Paginated, PaginationMeta } from "../interfaces/paginated.interface";

export function paginationParams(page = 1, limit = 50) {
  return { skip: (page - 1) * limit, take: limit };
}

export function buildMeta(page = 1, limit = 50, total = 0): PaginationMeta {
  return { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

export function paginatedResult<T>(data: T[], page: number, limit: number, total: number): Paginated<T> {
  return { data, meta: buildMeta(page, limit, total) };
}
