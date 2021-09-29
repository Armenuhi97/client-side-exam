import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//ng zorro
import { NgModule } from "@angular/core";
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzMessageModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzTableModule,
        NzModalModule,
        NzCheckboxModule,
        NzPopconfirmModule,
        NzDatePickerModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzMessageModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzTableModule,
        NzModalModule,
        NzCheckboxModule,
        NzPopconfirmModule,
        NzDatePickerModule
    ]
})
export class SharedModule { }