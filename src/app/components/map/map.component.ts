import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page-container"><div class="container"><h1>Interactive Map</h1><p>Explore Minya with our interactive map. This feature is coming soon!</p></div></div>`,
  styles: [`
    .page-container { min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center; }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary-color); }
    p { font-size: 1.2rem; color: var(--text-secondary); }
  `]
})
export class MapComponent {}
