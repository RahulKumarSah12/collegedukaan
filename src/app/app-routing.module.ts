import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignupLogninPageComponent } from './signup-lognin-page/signup-lognin-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductAddFormComponent } from './product-add-form/product-add-form.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: SignupLogninPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'product-add-form', component: ProductAddFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
