import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface/user.interface';
import { authService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidevarItems=[
    {label: 'Listado', icon: 'label', url: './list'},
    {label: 'Añadir', icon: 'add', url: './new-hero'},
    {label: 'Buscar', icon: 'search', url: './search'},
  ]

  constructor(

    private authservice: authService,
    private router: Router
    ){}

  get user():User | undefined {
    return this.authservice.currentUser()
  }

  onLogouth(){
    this.authservice.logouth();
    this.router.navigate(['/auth'])
  }

}
