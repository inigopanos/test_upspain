import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { getCharactersService } from '../../../services/get-characters.service';
import { getLocationService } from '../../../services/get-location.service';
import { EditFormComponent } from '../edit-form/edit-form/edit-form.component';
import { CharacterI } from '../../interface/character.interface';
import { LocationI } from '../../interface/location.interface';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [NgFor, NgIf, MatCardModule, MatButtonModule, EditFormComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  providers: [getCharactersService, getLocationService],
})
export class CharacterListComponent implements OnInit {
  characterList: Array<CharacterI> = [];
  locationList: Array<LocationI> = [];
  locationUrls: Array<string> = [];
  editFormActive: boolean = false;
  status: string = 'Open';

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

  // Gets location id from url
  getUrls() {
    this.characterList.forEach((character) => {
      if (!character.location.url) return;
      const urlParts = character.location.url.split('/');
      this.locationUrls.push(urlParts[5]);
    });
  }

  // Opens edit form
  openEditForm() {
    this.editFormActive = !this.editFormActive;
    if (this.editFormActive) {
      this.status = 'Close';
    } else {
      this.status = 'Open';
    }
  }

  updateData(modifiedData: CharacterI) {
    this.characterList[modifiedData.id - 1] = modifiedData;
  }
}
