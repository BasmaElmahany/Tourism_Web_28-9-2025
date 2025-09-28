import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled">
      <div class="container">
        <div class="nav-content">
          <!-- Logo -->
          <div class="nav-logo" routerLink="/home">
            <img src="/assets/images/app_icon.png" alt="Minya Tourism" class="logo-icon">
            <span class="logo-text">Minya Tourism</span>
          </div>

          <!-- Desktop Navigation -->
          <div class="nav-links desktop-nav">
            <a routerLink="/home" routerLinkActive="active" class="nav-link">
              <span class="material-icons">home</span>
              {{ i18nService.translate('home') }}
            </a>
            <a routerLink="/attractions" routerLinkActive="active" class="nav-link">
              <span class="material-icons">place</span>
              {{ i18nService.translate('attractions') }}
            </a>
            <a routerLink="/hotels" routerLinkActive="active" class="nav-link">
              <span class="material-icons">hotel</span>
              {{ i18nService.translate('hotels') }}
            </a>
            <a routerLink="/restaurants" routerLinkActive="active" class="nav-link">
              <span class="material-icons">restaurant</span>
              {{ i18nService.translate('restaurants') }}
            </a>
            <a routerLink="/events" routerLinkActive="active" class="nav-link">
              <span class="material-icons">event</span>
              {{ i18nService.translate('events') }}
            </a>
            <a routerLink="/itineraries" routerLinkActive="active" class="nav-link">
              <span class="material-icons">map</span>
              {{ i18nService.translate('itineraries') }}
            </a>
            <a routerLink="/blog" routerLinkActive="active" class="nav-link">
              <span class="material-icons">article</span>
              {{ i18nService.translate('blog') }}
            </a>
          </div>

          <!-- Language Switcher -->
          <div class="nav-actions">
            <app-language-switcher></app-language-switcher>
          </div>

          <!-- Mobile Menu Button -->
          <button class="mobile-menu-btn" (click)="toggleMobileMenu()" [class.active]="isMobileMenuOpen">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div class="mobile-nav" [class.open]="isMobileMenuOpen">
          <div class="mobile-nav-content">
            <!-- Language Switcher for Mobile -->
            <div class="mobile-language-switcher">
              <app-language-switcher></app-language-switcher>
            </div>
            
            <a routerLink="/home" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
              <span class="material-icons">home</span>
              {{ i18nService.translate('home') }}
            </a>
            <a routerLink="/attractions" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
              <span class="material-icons">place</span>
              {{ i18nService.translate('attractions') }}
            </a>
            <a routerLink="/hotels" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
              <span class="material-icons">hotel</span>
              {{ i18nService.translate('hotels') }}
            </a>
            <a routerLink="/restaurants" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
              <span class="material-icons">restaurant</span>
              {{ i18nService.translate('restaurants') }}
            </a>
            <a routerLink="/events" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
              <span class="material-icons">event</span>
              {{ i18nService.translate('events') }}
            </a>
            <a routerLink="/itineraries" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
              <span class="material-icons">map</span>
              {{ i18nService.translate('itineraries') }}
            </a>
            <a routerLink="/blog" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
              <span class="material-icons">article</span>
              {{ i18nService.translate('blog') }}
            </a>
            <a routerLink="/visitor-info" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
              <span class="material-icons">info</span>
              {{ i18nService.translate('visitorInfo') }}
            </a>
            <a routerLink="/map" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
              <span class="material-icons">explore</span>
              {{ i18nService.translate('map') }}
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      text-decoration: none;
      color: var(--text-primary);
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color);
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-link:hover {
      color: var(--primary-color);
      background: rgba(26, 54, 93, 0.1);
    }

    .nav-link.active {
      color: var(--primary-color);
      background: rgba(26, 54, 93, 0.1);
    }

    .nav-link .material-icons {
      font-size: 1.2rem;
    }

    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      justify-content: center;
      width: 30px;
      height: 30px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .hamburger-line {
      width: 100%;
      height: 2px;
      background: var(--primary-color);
      margin: 3px 0;
      transition: all 0.3s ease;
    }

    .mobile-menu-btn.active .hamburger-line:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-btn.active .hamburger-line:nth-child(2) {
      opacity: 0;
    }

    .mobile-menu-btn.active .hamburger-line:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    .mobile-nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--white);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .mobile-nav.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .mobile-nav-content {
      padding: 1rem 0;
    }

    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 500;
      transition: all 0.3s ease;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .mobile-nav-link:hover,
    .mobile-nav-link.active {
      color: var(--primary-color);
      background: rgba(26, 54, 93, 0.05);
    }

    .mobile-nav-link .material-icons {
      font-size: 1.2rem;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .mobile-language-switcher {
      padding: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: 0.5rem;
    }

    @media (max-width: 1024px) {
      .desktop-nav {
        gap: 1.5rem;
      }
      
      .nav-link {
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 768px) {
      .desktop-nav,
      .nav-actions {
        display: none;
      }

      .mobile-menu-btn {
        display: flex;
      }

      .logo-text {
        font-size: 1.1rem;
      }

      .logo-icon {
        width: 35px;
        height: 35px;
      }
    }
  `]
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
}
