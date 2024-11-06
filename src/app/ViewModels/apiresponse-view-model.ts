export interface APIResponseViewModel {
  success: boolean;
  data: any;
  messages: string[];
  pageNo?: number;
  totalPages?: number;
  itemsPerPage?: number;
}
