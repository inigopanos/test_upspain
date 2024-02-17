import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { getCharactersService } from '../../../services/get-characters.service';
import { getLocationService } from '../../../services/get-location.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [NgFor, NgIf, MatCardModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  providers: [getCharactersService, getLocationService],
})
export class CharacterListComponent implements OnInit {
  characterList: Array<any> = [];
  locationList: Array<any> = [];
  locationUrls: Array<string> = [];

  constructor(
    private getAllCharactersService: getCharactersService,
    private getLocationService: getLocationService
  ) {}

  // Lifecycle hook executes on component initiation
  ngOnInit(): void {
    this.getAllCharacters();
    this.getLocation();
  }

  // Calls the service to get all characters
  private getAllCharacters() {
    this.getAllCharactersService.getCharacters().subscribe({
      next: (data) => {
        this.characterList = data.results;
        this.getUrls();
      },
    });
  }

  private getLocation() {
    this.getLocationService.getLocation().subscribe({
      next: (data) => {
        this.locationList = data.results;
      },
    });
  }

  getUrls() {
    this.characterList.forEach((character) => {
      if (!character.location.url) return;
      const urlParts = character.location.url.split('/');
      this.locationUrls.push(urlParts[5]);
    });
  }
}
