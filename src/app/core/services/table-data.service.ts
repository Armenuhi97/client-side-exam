import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SucceedServerResponse, ServerResponse, TableData } from "../models";

@Injectable({ providedIn: 'root' })
export class TableDataService {
    constructor(private _httpClient: HttpClient) { }

    public getTableData(): Observable<ServerResponse<TableData[]>> {
        return this._httpClient.get<ServerResponse<TableData[]>>(`http://localhost:4200/data/`)
    }
    public addData(data: TableData): Observable<SucceedServerResponse> {
        return this._httpClient.post<SucceedServerResponse>(`http://localhost:4200/data`, data)
    }
    public editData(id: number, data: TableData): Observable<TableData> {
        let params = new HttpParams();
        params = params.set('id', id.toString());
        return this._httpClient.put<TableData>(`http://localhost:4200/data/${id}`, data, { params })
    }
    public deleteData(id: number): Observable<SucceedServerResponse> {
        let params = new HttpParams();
        params = params.set('id', id.toString());
        return this._httpClient.delete<SucceedServerResponse>(`http://localhost:4200/data/${id}`, { params })
    }
}