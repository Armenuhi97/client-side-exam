export interface ServerResponse<T> {
    offset: number;
    limit: number;
    total: number;
    result: T
}