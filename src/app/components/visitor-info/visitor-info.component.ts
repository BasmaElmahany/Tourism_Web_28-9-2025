import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visitor-info',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page-container"><div class="container"><h1>Visitor Info</h1><p>Essential travel information and tips. This feature is coming soon!</p></div></div>`,
  styles: [`
    .page-container { min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center; }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary-color); }
    p { font-size: 1.2rem; color: var(--text-secondary); }
  `]
})
export class VisitorInfoComponent {}
