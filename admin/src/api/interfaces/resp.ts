export interface Response<T> {
  code: number;
  msg: string;
  data: T;
}

export interface PageResponse<T> {
  code: number;
  msg: string;
  data: {
    page_no: number;
    size: number;
    total_count: number;
    total_page: number;
    list: T[];
  };
}
