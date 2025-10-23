import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public i18n: I18nService) {}

  onNewsletterSubmit(event: Event) {
    event.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription submitted');
    // You can add actual newsletter subscription logic here
  }
}
