import { Component, OnInit } from '@angular/core';
import { heroesService } from '../../service/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interface/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{

  public hero?:Hero;

  constructor(
    private service:heroesService,
    private activateRoute:ActivatedRoute,
    private router:Router,
    ){}

  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      switchMap( ({id})=>this.service.getHeroById(id) ))
      .subscribe( hero=>{
        if( !hero ) return  this.router.navigate(['/heroes/list']);
        this.hero=hero
        console.log(this.hero);
        return
      });
  }

  goBack(){
    this.router.navigateByUrl('heroes/list')
  }

}
