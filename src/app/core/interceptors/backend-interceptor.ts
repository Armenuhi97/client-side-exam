
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
let tableData = [
    { "id": 1, "healthIndex": 85, "endDate": null, "minValueDateTime": 1514844000, "type": "systemHealth", "cowId": 636, "animalId": "624", "eventId": 34720, "deletable": false, "lactationNumber": 4, "daysInLactation": 92, "ageInDays": 2101, "startDateTime": 1514844000, "reportingDateTime": 1514844938 },
    { "id": 2, "healthIndex": 185, "endDate": null, "minValueDateTime": 1514844000, "type": "systemHealth", "cowId": 809, "animalId": "871", "eventId": 34719, "deletable": false, "lactationNumber": 1, "daysInLactation": 357, "ageInDays": 1075, "startDateTime": 1514844000, "reportingDateTime": 1514844929 },
    { "id": 3, "alertType": "preCalving", "duration": 990, "originalStartDateTime": null, "endDateTime": null, "daysInPregnancy": null, "type": "distress", "cowId": 910, "animalId": "961", "eventId": 34718, "deletable": false, "lactationNumber": 0, "daysInLactation": 770, "ageInDays": 770, "startDateTime": 1514842797, "reportingDateTime": 1514844259 },
    { "id": 4, "healthIndex": 177, "endDate": null, "minValueDateTime": 1514840400, "type": "systemHealth", "cowId": 910, "animalId": "961", "eventId": 34716, "deletable": false, "lactationNumber": 0, "daysInLactation": 770, "ageInDays": 770, "startDateTime": 1514836800, "reportingDateTime": 1514843103 },
]

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const paramsArray = req.params.keys().map(x => ({ [x]: req.params.get(x) }));

        if (req.method === "GET") {
            return this._getRequest()
        }

        if (req.method === "POST") {
            return this._postRequest(req)
        }

        if (req.method === "PUT") {
            let id = +paramsArray[0].id;
            return this._putRequest(req, id)
        }

        if (req.method === "DELETE") {
            let id = +paramsArray[0].id;
            return this._deleteRequest(id)
        }
        next.handle(req)
    }

    private _getRequest(): Observable<HttpEvent<any>> {
        return of(new HttpResponse({
            status: 200,
            body: {
                "offset": 0,
                "limit": 100,
                "total": tableData.length,
                "result": tableData
            }
        }));
    }

    private _postRequest(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let id = tableData && tableData.length ? +tableData[tableData.length - 1].id + 1 : 1;
        let body = Object.assign({}, req.body, { id: id })
        tableData.push(body);
        return of(new HttpResponse({
            status: 200,
            body: { "message": "Ok" }

        }));
    }

    private _putRequest(req: HttpRequest<any>, id: number): Observable<HttpEvent<any>> {
        let body = Object.assign({}, req.body, { id: id })
        tableData = tableData.map((data) => {
            if (+data.id === +id) {
                data = body
            }
            return data
        })
        return of(new HttpResponse({
            status: 200,
            body: body
        }));
    }

    private _deleteRequest(id: number): Observable<HttpEvent<any>> {
        let data = tableData.find((val) => { return +val.id == +id });
        if (data) {
            let index = tableData.indexOf(data);
            if (index > -1) {
                tableData.splice(index, 1);
                tableData = [...tableData];
            }
        }
        return of(new HttpResponse({
            status: 200,
            body: { "message": "Ok" }

        }));
    }
}