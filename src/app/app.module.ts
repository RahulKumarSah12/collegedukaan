import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SignupLogninPageComponent } from './signup-lognin-page/signup-lognin-page.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthInterceptor } from './auth.interceptor';
import { SignupCreateAccountService } from './signup-create-account.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProductAddFormComponent } from './product-add-form/product-add-form.component';

@NgModule({
  declarations: [
    
    AppComponent,
         SignupLogninPageComponent,
         CreateAccountComponent,
         MainPageComponent,
         ProductAddFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule 


  ],
  providers: [
    SignupCreateAccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
