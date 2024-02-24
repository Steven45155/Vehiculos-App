import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayouPageComponent } from './pages/layou-page/layou-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

  const routes:Routes=[
    {
      path: '',
      component:  LayouPageComponent,
      children: [
        {
          path: 'login',
          component: LoginPageComponent
        },
        {
          path: 'new-account',
          component: RegisterPageComponent
        },
        {
          path: '**',
          redirectTo: 'login'
        }
      ]
    }
  ]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],
})
export class authRoutingModule { }
