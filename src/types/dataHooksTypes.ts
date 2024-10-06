export interface DataFetchParams {
    endpoint: string;
    page?: number;
    pageSize?: number;
    singleId?: string;
    selectedFilterValue?: Record<string, any>;

}