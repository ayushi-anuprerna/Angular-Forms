import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Level1Component } from './Level1Component/level-1';
import { Level2Component } from './Level2Component/level-2';
import { Level3 } from './Level3Component/level-3';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,Level2Component,Level3],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Form-Task');
}
