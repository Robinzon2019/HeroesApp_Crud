import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HeroeModel } from '../pages/models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-c942d-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, heroe)
            .pipe(
              map((resp: any) =>{
                heroe.id = resp.name;
                return heroe;
              })
            );
  }

  actualizarHeroe(heroe: HeroeModel){
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
            .pipe(
              map((resp: any) => {

                if(resp === null)
                  return [];

                const heroes: HeroeModel[] = [];
                Object.keys(resp).forEach((key) => {
                  const heroe = resp[key];
                  heroe.id = key;
                  heroes.push(heroe);
                });

                return heroes;
              })
            );
  }

  // private crearArreglo(heroesObj: any){
    
  //   if(heroesObj === null){
  //     return [];
  //   }

  //   const heroes: HeroeModel[] = [];

  //   Object.keys(heroesObj).forEach(key => {
  //     const heroe: HeroeModel = heroesObj[key];
  //     heroe.id = key;
  //     heroes.push(heroe);
  //   });

  //   return heroes;
  // }
}


