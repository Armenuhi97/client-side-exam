import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ServerResponse } from './core/models';
import { TableData } from './core/models/entity';
import { TableDataService } from './core/services/table-data.service';
import { Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client-side-exam';
  unsubscribe$ = new Subject();
  public isVisible = false;
  public isEditing = false;
  public editIndex: number;
  public total: number;
  public validateForm: FormGroup;
  public tableData: TableData[] = [];

  constructor(
    private _tableDataService: TableDataService,
    private _nzMessages: NzMessageService,
    private _datePipe: DatePipe,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.getTableData().pipe(takeUntil(this.unsubscribe$)).subscribe()
  }

  public addDataInTable(): void {
    this.isVisible = true;
  }
  
  public formatDate(date: number): string {
    return date ? this._datePipe.transform(new Date(date), 'YYYY-MM-dd HH:mm') : null
  }

  public deleteData(data: TableData): void {
    this._tableDataService.deleteData(data.id).pipe(takeUntil(this.unsubscribe$),
      switchMap(() => {
        this.onCancel();
        return this.getTableData()
      })).subscribe()
  }

  public initForm(): void {
    this.validateForm = this._fb.group({
      healthIndex: [null],
      cowId: [null],
      endDate: [null],
      minValueDateTime: [null],
      type: [null],
      animalId: [null],
      eventId: [null],
      deletable: [null],
      lactationNumber: [null],
      daysInLactation: [null],
      ageInDays: [null],
      startDateTime: [null],
      reportingDateTime: [null],
    })
  }

  public editData(index: number): void {
    this.isVisible = true;
    this.isEditing = true;
    this.editIndex = index;
    let item = this.tableData[this.editIndex];
    let value = Object.assign({}, item, {
      endDate: this._checkIsExistDate(item.endDate),
      minValueDateTime: this._checkIsExistDate(item.minValueDateTime),
      startDateTime: this._checkIsExistDate(item.startDateTime),
      reportingDateTime: this._checkIsExistDate(item.reportingDateTime)
    })
    this.validateForm.patchValue(value)
  }

  private _checkIsExistDate(date: number): Date | null {
    return date ? new Date(date) : null
  }

  public onSave(): void {
    if (this.validateForm.invalid) {
      this._nzMessages.error('Validate error');
      return
    }
    const formValue = this.validateForm.value;
    let sendObject = {
      cowId: formValue.cowId,
      healthIndex: formValue.healthIndex,
      endDate: this._setDateInMiliseconds(formValue.endDate),
      minValueDateTime: this._setDateInMiliseconds(formValue.minValueDateTime),
      type: formValue.type,
      animalId: formValue.animalId,
      eventId: formValue.eventId,
      deletable: formValue.deletable,
      lactationNumber: formValue.lactationNumber,
      daysInLactation: formValue.daysInLactation,
      ageInDays: formValue.ageInDays,
      startDateTime: this._setDateInMiliseconds(formValue.startDateTime),
      reportingDateTime: this._setDateInMiliseconds(formValue.reportingDateTime),
    }
    this._sendResponce(sendObject).pipe(takeUntil(this.unsubscribe$)).subscribe()
  }

  private _setDateInMiliseconds(time: Date): number | null {
    return time ? time.getTime() : null
  }

  private _sendResponce(sendObject: TableData): Observable<void> {
    if (this.isEditing) {
      return this._tableDataService.editData(this.tableData[this.editIndex].id, sendObject).pipe(map((data: TableData) => {
        this.tableData[this.editIndex] = data;
        this.tableData = [...this.tableData];
        this.onCancel()
      }))
    } else {
      return this._tableDataService.addData(sendObject).pipe(
        switchMap(() => {
          this.onCancel();
          return this.getTableData()
        })
      )
    }
  }

  public getTableData(): Observable<void> {
    return this._tableDataService.getTableData().pipe(
      map((data: ServerResponse<TableData[]>) => {
        this.total = data.total;
        this.tableData = [...data.result];
      }))
  }

  public onCancel(): void {
    this.isVisible = false;
    this.isEditing = false;
    this.editIndex = null;
    this.validateForm.reset()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}