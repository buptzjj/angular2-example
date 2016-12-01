import { Injectable } from '@angular/core';
import { Headers,Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';
import {HEROES} from './mock-heroes';


@Injectable()
export class HeroService{
    private heroUrl = 'app/heroes';
    private handleError(error:any):Promise<any> {
        console.error('An error occurs',error);
        return Promise.reject(error.message || error);
    }
    constructor(private http:Http){}

    getHeroes():Promise<Hero[]>{
        return this.http.get(this.heroUrl)
        .toPromise()
        .then(response => response.json().data as Hero[])
        .catch(this.handleError);
    }
    getHeroesSlowly():Promise<Hero[]>{
        return new Promise<Hero[]>(resolve=>setTimeout(resolve,2000))
        .then(()=>this.getHeroes());
    }
    getHero(id:number):Promise<Hero>{
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id===id));
    }
}
