
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interface/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class heroesService {

  private url:string=environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    const link=this.http.get<Hero[]>(`${this.url}/heroes`);
    return (link)
  }

  getHeroById( id:string ): Observable<Hero | undefined>{

    return this.http.get<Hero>(`${this.url}/heroes/${id}`)
    .pipe(catchError( error => of (undefined)))
  }

  getSuggestions( query:string ):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.url}/heroes?q=${query}&_limit=6`)
  }

  addHero( hero:Hero ): Observable<Hero>{
    return this.http.post<Hero>(`${this.url}/heroes`,hero)
  }

  updateHero( hero:Hero): Observable<Hero>{
    if( !hero.id) throw Error('no tiene id');
    return this.http.patch<Hero>(`${this.url}/heroes/${hero.id}`,hero)
  }

  deleteHeroById( id:string): Observable<boolean>{
    return this.http.delete(`${this.url}/heroes/${id}`)
    .pipe(
      map( resp=> true),
      catchError(err=> of (false))
    )
  }
}
