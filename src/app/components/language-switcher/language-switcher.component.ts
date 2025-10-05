import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService, Language } from '../../services/i18n.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
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

  switchLanguage(lang: string) {
  this.i18nService.setLanguage(lang);
  this.i18nService.setDirection(this.i18nService.isRTL());
}
}
