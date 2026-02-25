export type PaginatedData<T> = {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: T[];
};
