import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getCharactersService } from '../../../services/get-characters.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  providers: [getCharactersService],
})
export class CharacterListComponent implements OnInit {
  characterList: Array<any> = [];

  constructor(
    private http: HttpClient,
    private getAllCharactersService: getCharactersService
  ) {}

  // Lifecycle hook executes on component initiation
  ngOnInit(): void {
    this.getAllCharacters();
    console.log(this.characterList);
  }

  // Calls the service to get all characters
  private getAllCharacters() {
    this.getAllCharactersService.getCharacters().subscribe({
      next: (data) => {
        this.characterList = data.results;
        console.log('Log de component:', this.characterList);
      },
    });
  }
}
