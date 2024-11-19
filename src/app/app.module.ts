import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './climbinsight/components/notfound/notfound.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './climbinsight/interceptors/jwt.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ErrorInterceptor } from './climbinsight/interceptors/error.interceptor';
import { MessageService } from 'primeng/api';
import { AuthModule } from './climbinsight/components/auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        AuthModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        CookieService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
