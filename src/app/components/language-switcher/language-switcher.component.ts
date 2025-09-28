import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService, Language } from '../../services/i18n.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher" [class.rtl]="i18nService.isRTL()">
      <button 
        class="language-toggle"
        (click)="toggleDropdown()"
        [attr.aria-label]="'Switch language'"
      >
        <span class="current-language">
          <span class="flag">{{ currentLanguage.flag }}</span>
          <span class="name">{{ currentLanguage.nativeName }}</span>
        </span>
        <span class="material-icons arrow" [class.open]="isDropdownOpen">
          keyboard_arrow_down
        </span>
      </button>

      <div class="language-dropdown" [class.open]="isDropdownOpen">
        <button
          *ngFor="let language of languages"
          class="language-option"
          [class.active]="language.code === currentLanguage.code"
          (click)="selectLanguage(language.code)"
        >
          <span class="flag">{{ language.flag }}</span>
          <span class="name">{{ language.nativeName }}</span>
          <span class="english-name">({{ language.name }})</span>
          <span class="material-icons check" *ngIf="language.code === currentLanguage.code">
            check
          </span>
        </button>
      </div>

      <!-- Backdrop for mobile -->
      <div 
        class="dropdown-backdrop" 
        [class.open]="isDropdownOpen"
        (click)="closeDropdown()"
      ></div>
    </div>
  `,
  styles: [`
    .language-switcher {
      position: relative;
      display: inline-block;
    }

    .language-toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--white);
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-normal);
      font-size: 0.9rem;
      min-width: 120px;
    }

    .language-toggle:hover {
      border-color: var(--primary-color);
      box-shadow: 0 2px 8px rgba(26, 54, 93, 0.1);
    }

    .current-language {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
    }

    .flag {
      font-size: 1.2rem;
    }

    .name {
      font-weight: 500;
      color: var(--text-primary);
    }

    .arrow {
      font-size: 1.2rem;
      color: var(--text-secondary);
      transition: transform var(--transition-normal);
    }

    .arrow.open {
      transform: rotate(180deg);
    }

    .language-dropdown {
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      right: 0;
      background: var(--white);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all var(--transition-normal);
      z-index: 1000;
      min-width: 200px;
    }

    .language-dropdown.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .language-option {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: background-color var(--transition-normal);
      font-size: 0.9rem;
      text-align: left;
    }

    .rtl .language-option {
      text-align: right;
    }

    .language-option:hover {
      background: var(--background-color);
    }

    .language-option.active {
      background: rgba(26, 54, 93, 0.05);
      color: var(--primary-color);
    }

    .language-option .name {
      font-weight: 500;
      flex: 1;
    }

    .english-name {
      color: var(--text-secondary);
      font-size: 0.8rem;
    }

    .check {
      color: var(--primary-color);
      font-size: 1rem;
    }

    .dropdown-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      opacity: 0;
      visibility: hidden;
      z-index: 999;
    }

    .dropdown-backdrop.open {
      opacity: 1;
      visibility: visible;
    }

    /* RTL Adjustments */
    .rtl .language-dropdown {
      left: auto;
      right: 0;
    }

    .rtl .current-language {
      flex-direction: row-reverse;
    }

    .rtl .language-option {
      flex-direction: row-reverse;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .language-toggle {
        min-width: 100px;
        padding: 0.4rem 0.8rem;
        font-size: 0.85rem;
      }

      .language-dropdown {
        min-width: 180px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .language-option {
        padding: 0.6rem 0.8rem;
        font-size: 0.85rem;
      }
    }

    /* Animation for language switch */
    .language-switcher.switching {
      animation: languageSwitch 0.3s ease-out;
    }

    @keyframes languageSwitch {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    /* Focus styles for accessibility */
    .language-toggle:focus,
    .language-option:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .language-toggle {
        border-width: 3px;
      }
      
      .language-dropdown {
        border-width: 2px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .language-toggle,
      .language-dropdown,
      .arrow {
        transition: none;
      }
      
      .language-switcher.switching {
        animation: none;
      }
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit {
  languages: Language[] = [];
  currentLanguage: Language = this.i18nService.getCurrentLanguageInfo();
  isDropdownOpen = false;

  constructor(public i18nService: I18nService) {}

  ngOnInit() {
    this.languages = this.i18nService.getLanguages();
    
    // Subscribe to language changes
    this.i18nService.currentLanguage$.subscribe(languageCode => {
      this.currentLanguage = this.i18nService.getCurrentLanguageInfo();
      this.closeDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-switcher')) {
        this.closeDropdown();
      }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeDropdown();
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  selectLanguage(languageCode: string) {
    if (languageCode !== this.currentLanguage.code) {
      // Add switching animation
      const element = document.querySelector('.language-switcher');
      element?.classList.add('switching');
      
      setTimeout(() => {
        this.i18nService.setLanguage(languageCode);
        element?.classList.remove('switching');
      }, 150);
    }
    this.closeDropdown();
  }
}
