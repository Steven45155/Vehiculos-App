import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, Publisher } from '../../interface/hero.interface';
import { heroesService } from '../../service/heroes.service';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [
  ]
})
export class NewHeroPageComponent implements OnInit{

  public heroForm=new FormGroup(
    {
      id:new FormControl<string>(''),
      superhero:new FormControl<string  >('', { nonNullable:true}),
      publisher:new FormControl<Publisher>( Publisher.DCComics ),
      alter_ego:new FormControl(''),
      first_appearance:new FormControl(''),
      characters:new FormControl(''),
      alt_img:new FormControl(''),
    }
  )

  public publishers=[
    {id:'DC Comics', desc: 'DC-Comics'},
    {id:'Marvel Comics', desc: 'Marvel-Comics'},
  ]

  constructor(
    private service:heroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ){}

  get currenHero():Hero{
    const hero=this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {

    if( !this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap( ({id})=> this.service.getHeroById( id ) ),
    ).subscribe(hero=>{
      if(!hero) {return this.router.navigateByUrl('/');}
      this.heroForm.reset(hero);
      return;
    })
  }

  onSubmit():void{

    if(this.heroForm.invalid) return;

    if ( this.currenHero.id){
      this.service.updateHero( this.currenHero )
      .subscribe(hero=>{
        this.showSnackbar(`${hero.superhero} update!`)
      });
      return;
    }

    this.service.addHero( this.currenHero )
    .subscribe(hero=>{
      this.router.navigate(['/heroes/edit', hero.id])
      this.showSnackbar(`${hero.superhero}c create!`)
    });
  }

  confirDelete(){
if( !this.currenHero.id ) throw Error('Hero id is required');
    const dialogRef=this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value
    });
    dialogRef.afterClosed()

    .pipe(
      filter((result:boolean)=> result ),
      switchMap( ()=> this.service.deleteHeroById( this.currenHero.id )),
      filter( (wasDeleted)=> wasDeleted )
      )

      .subscribe( result=>{
        this.router.navigateByUrl('/')
    })
    //  dialogRef.afterClosed().subscribe( result=>{
    //   if ( !result ) return;
    //   this.service.deleteHeroById( this.currenHero.id )
    //   .subscribe( wasDeleted=>{
    //     if( wasDeleted)
    //     this.router.navigateByUrl('/');
    //   })
    //  })
  }

  showSnackbar( message:string ):void{
    this.snackbar.open(message, 'done', {
      duration: 2500
    })
  }
}
