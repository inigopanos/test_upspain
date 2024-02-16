import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class getCharactersService {
  constructor(private http: HttpClient) {}

  private listCharacters$ = new Subject<any>();

  public setCharacters(characters: any) {
    this.listCharacters$.next(characters);
  }

  public getCharacters(): Subject<any> {
    this.getCharactersFromApi();
    return this.listCharacters$;
  }

  private getCharactersFromApi() {
    this.http
      .get<any[]>('https://rickandmortyapi.com/')
      .subscribe((data: Array<any>) => {
        this.setCharacters(data);
      });
  }
}
