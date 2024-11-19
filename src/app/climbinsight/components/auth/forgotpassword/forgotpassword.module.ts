import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';

@NgModule({
    declarations: [ForgotpasswordComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        ToastModule,
        ForgotpasswordRoutingModule
    ],
    exports: [ForgotpasswordComponent]
})
export class ForgotpasswordModule { } 