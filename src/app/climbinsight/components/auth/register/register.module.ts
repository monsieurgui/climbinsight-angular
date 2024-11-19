import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ToastModule
    ]
})
export class RegisterModule { } 