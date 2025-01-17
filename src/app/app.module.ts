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
import { CapitalizePipe } from './capitalize.pipe';
import { TitleCasePipe } from './title-case.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import { ProfileComponent } from './profile/profile.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    
    AppComponent,
         SignupLogninPageComponent,
         CreateAccountComponent,
         MainPageComponent,
         ProductAddFormComponent,
         CapitalizePipe,
         TitleCasePipe,
         LoaderComponent,
         ProfileComponent,
         CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgOtpInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
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
