import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';

import { LayouPageComponent } from './pages/layou-page/layou-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';



@NgModule({
  declarations: [
    LayouPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    CommonModule,
    authRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
