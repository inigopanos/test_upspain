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
export class getLocationService {
  constructor(private http: HttpClient) {}

  private location$ = new Subject<any>();

  // Sets all locations
  public setLocation(location: any) {
    this.location$.next(location);
  }

  // Get all locations
  public getLocation(): Subject<any> {
    this.getLocationFromApi();
    return this.location$;
  }

  // Gets locations from Api
  private getLocationFromApi() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });

    this.http
      .get<any[]>('https://rickandmortyapi.com/api/location', {
        headers: headers,
      })
      .subscribe((data: Array<any>) => {
        this.setLocation(data);
      });
  }
}
