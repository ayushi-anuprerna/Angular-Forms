import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Level1 } from './level-1/level-1';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Level1,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Form-Task');
}
