import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Form-Task');

  constructor(private router: Router) {}

  public navigateToLevel1() {
    this.router.navigate(['/']);
  }

  public navigateToLevel2() {
    this.router.navigate(['/level-2']);
  }

  public navigateToLevel3() {
    this.router.navigate(['/level-3']);
  }
}
