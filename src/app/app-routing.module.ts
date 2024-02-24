import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { authGuard, canActivate, canMatch } from './auth/guard/auth.guard';
import { canActivate2, canMatch2 } from './auth/guard/public.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule),
    canActivate:[ canActivate2],
    canMatch:[canMatch2]
  },
  {
    path: 'heroes',
    loadChildren: ()=> import('./heroes/heroes.module').then(m=>m.HeroesModule),
    canActivate: [canActivate],
    canMatch: [canMatch]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
