import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd,Event } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavigationComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-navigation *ngIf="showNavigation"></app-navigation>
      <main class="main-content" [class.with-navigation]="showNavigation">
        <router-outlet></router-outlet>
      </main>
      <app-footer *ngIf="showNavigation"></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
    }
    
    .main-content.with-navigation {
      padding-top: 80px; /* Account for fixed navigation */
    }
    
    @media (max-width: 768px) {
      .main-content.with-navigation {
        padding-top: 70px;
      }
    }
  `]
})
export class AppComponent {
  title = 'Minya Tourism';
  showNavigation = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.showNavigation = event.url !== '/';
      });
  }
}
