import { Component, OnInit } from '@angular/core';
import { heroesService } from '../../service/heroes.service';
import { Hero } from '../../interface/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{

  constructor( private service:heroesService){}

  ngOnInit(): void {
    this.service.getHeroes().subscribe(m=>this.heroes=m)
  }

  public heroes:Hero[]=[]
}
