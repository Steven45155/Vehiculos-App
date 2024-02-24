import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interface/hero.interface';

@Component({
  selector: 'heroes-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  ngOnInit(): void {
    if( !this.heroes ) throw Error('Hero property is required')
  }

  @Input()
  public heroes!:Hero;

}
