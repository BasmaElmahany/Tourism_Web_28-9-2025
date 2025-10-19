import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor(private router: Router, public i18nService: I18nService) {}

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Scroll to the Weather section on the Home page. If we're not on Home, navigate there first.
  async scrollToWeather() {
    const targetId = 'weather';
    // If current route is not home, navigate to it then wait a tick for DOM to render
    if (!this.router.url || !this.router.url.includes('/home')) {
      await this.router.navigate(['/home']);
      // small delay to allow Home component to render
      await new Promise((r) => setTimeout(r, 120));
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // fallback: navigate to home without scrolling
      console.warn('Weather section not found to scroll to.');
    }
  }
}
