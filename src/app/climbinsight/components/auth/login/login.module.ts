import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ToastModule
    ]
})
export class LoginModule { }
