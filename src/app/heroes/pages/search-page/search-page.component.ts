import { Component, OnInit } from '@angular/core';
import { heroesService } from '../../service/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interface/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent{

  constructor( private service:heroesService ){}

  public searchInput=new FormControl('');

  public heroes: Hero[]=[];

  public selectHero?:Hero;

  public characters?:string;

  public visual:boolean=false

  searchHero(){
    const value:string=this.searchInput.value || '';

    this.service.getSuggestions( value ).subscribe(hero=>this.heroes=hero)
    }

    onSelectedOption( evevnt: MatAutocompleteSelectedEvent ){
      if( !evevnt.option.value ){
          this.visual=false;
          this.selectHero=undefined;
        return;
      }
      this.visual=true;
      const hero:Hero=evevnt.option.value;
      this.searchInput.setValue( hero.superhero );
      this.selectHero=hero;
    }

}
