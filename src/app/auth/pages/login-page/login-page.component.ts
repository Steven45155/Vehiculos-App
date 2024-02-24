import { Component } from '@angular/core';
import { authService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private service: authService,
    private router: Router
    ){}

  onLogin(): void{
    this.service.login('steven@gmail.com', '1234')
    .subscribe(user=>{
      this.router.navigate(['/'])
    })
  }
}
