import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterI } from '../../../interface/character.interface';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
})
export class EditFormComponent {
  @Input() data: CharacterI = {} as CharacterI;
  @Output() saveData = new EventEmitter<CharacterI>();

  constructor() {}

  save() {
    this.saveData.emit(this.data);
  }
}
