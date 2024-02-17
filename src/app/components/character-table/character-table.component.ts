import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { getCharactersService } from '../../../services/get-characters.service';
import { getLocationService } from '../../../services/get-location.service';
import { EditFormComponent } from '../edit-form/edit-form/edit-form.component';
import { CharacterI } from '../../interface/character.interface';

@Component({
  selector: 'app-character-table',
  standalone: true,
  imports: [NgFor, NgIf, EditFormComponent, MatTableModule],
  templateUrl: './character-table.component.html',
  styleUrl: './character-table.component.scss',
})
export class CharacterTableComponent implements OnInit {
  characterList: Array<any> = [];
  locationList: Array<any> = [];
  locationUrls: Array<string> = [];
  editFormActive: boolean = false;
  status: string = 'Open';
  displayedColumns: string[] = ['Id', 'Name', 'Status', 'Location'];
  datosTabla = [{ Id: 0, Name: '', Status: '', Location: '' }];

  constructor(private getAllCharactersService: getCharactersService) {}
  // Lifecycle hook executes on component initiation
  ngOnInit(): void {
    this.getAllCharacters();
  }

  // Calls the service to get all characters
  private getAllCharacters() {
    this.getAllCharactersService.getCharacters().subscribe({
      next: (data) => {
        this.characterList = data.results.slice(0, 10);
        this.setCharacterTable(this.characterList);
      },
    });
  }

  setCharacterTable(characterList: CharacterI[]) {
    this.datosTabla = characterList.map((character) => ({
      Id: character.id,
      Name: character.name,
      Status: character.status,
      Location: character.location.name,
    }));
  }
}
