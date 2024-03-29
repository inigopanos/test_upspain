import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class getCharactersService {
  constructor(private http: HttpClient) {}

  private listCharacters$ = new Subject<any>();

  // Sets all characters
  public setCharacters(characters: any) {
    this.listCharacters$.next(characters);
  }

  // Get all characters
  public getCharacters(): Subject<any> {
    this.getCharactersFromApi();
    return this.listCharacters$;
  }

  // Gets characters from Api
  private getCharactersFromApi() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });

    this.http
      .get<any[]>('https://rickandmortyapi.com/api/character', {
        headers: headers,
      })
      .subscribe((data: Array<any>) => {
        this.setCharacters(data);
      });
  }
}
