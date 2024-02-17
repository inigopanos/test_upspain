import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterTableComponent } from './components/character-table/character-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CharacterListComponent,
    CharacterTableComponent,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'test_upspain';
  showList: boolean = true;

  openList() {
    this.showList = !this.showList;
  }
}
