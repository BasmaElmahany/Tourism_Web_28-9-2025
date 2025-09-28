import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-pattern"></div>
      <div class="container">
        <div class="footer-content">
          <!-- Main Footer Content -->
          <div class="footer-main">
            <div class="footer-section">
              <div class="footer-logo">
                <img src="/assets/images/app_icon.png" alt="Minya Tourism" class="footer-logo-icon">
                <h3>Minya Tourism</h3>
              </div>
              <p class="footer-description">
                Discover the hidden treasures of Minya, Egypt. Explore ancient attractions, 
                rich culture, and unforgettable experiences along the Nile River.
              </p>
              <div class="social-links">
                <a href="#" class="social-link" aria-label="Facebook">
                  <span class="material-icons">facebook</span>
                </a>
                <a href="#" class="social-link" aria-label="Instagram">
                  <span class="material-icons">camera_alt</span>
                </a>
                <a href="#" class="social-link" aria-label="YouTube">
                  <span class="material-icons">play_circle</span>
                </a>
                <a href="#" class="social-link" aria-label="Twitter">
                  <span class="material-icons">alternate_email</span>
                </a>
              </div>
            </div>

            <div class="footer-section">
              <h4>Explore</h4>
              <ul class="footer-links">
                <li><a routerLink="/attractions">Attractions</a></li>
                <li><a routerLink="/hotels">Hotels</a></li>
                <li><a routerLink="/restaurants">Restaurants</a></li>
                <li><a routerLink="/events">Events</a></li>
                <li><a routerLink="/itineraries">Itineraries</a></li>
              </ul>
            </div>

            <div class="footer-section">
              <h4>Information</h4>
              <ul class="footer-links">
                <li><a routerLink="/visitor-info">Visitor Guide</a></li>
                <li><a routerLink="/blog">Travel Blog</a></li>
                <li><a routerLink="/map">Interactive Map</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#about">About Minya</a></li>
              </ul>
            </div>

            <div class="footer-section">
              <h4>Contact Info</h4>
              <div class="contact-info">
                <div class="contact-item">
                  <span class="material-icons">location_on</span>
                  <span>Minya, Egypt</span>
                </div>
                <div class="contact-item">
                  <span class="material-icons">phone</span>
                  <span>+20 86 234 5555</span>
                </div>
                <div class="contact-item">
                  <span class="material-icons">email</span>
                  <span>info-minyatourism.com</span>
                </div>
              </div>
              
              <!-- Mobile App Download -->
              <div class="app-download">
                <h5>Download Our App</h5>
                <div class="download-buttons">
                  <a href="#" class="download-btn">
                    <span class="material-icons">smartphone</span>
                    <div>
                      <small>Download for</small>
                      <strong>Android & iOS</strong>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Newsletter Signup -->
          <div class="newsletter-section">
            <div class="newsletter-content">
              <h4>Stay Updated</h4>
              <p>Subscribe to our newsletter for the latest travel tips and updates about Minya.</p>
            </div>
            <form class="newsletter-form" (ngSubmit)="onNewsletterSubmit($event)">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                class="newsletter-input"
                required
              >
              <button type="submit" class="newsletter-btn">
                <span class="material-icons">send</span>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p>&copy; 2024 Minya Tourism. All rights reserved.</p>
            <div class="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--primary-gradient);
      color: var(--white);
      position: relative;
      overflow: hidden;
    }

    .footer-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('/assets/images/pattern_bg.png');
      background-repeat: repeat;
      background-size: 200px;
      opacity: 0.1;
    }

    .footer-content {
      position: relative;
      z-index: 1;
      padding: 3rem 0 1rem;
    }

    .footer-main {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h4,
    .footer-section h5 {
      color: var(--white);
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .footer-logo-icon {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }

    .footer-logo h3 {
      color: var(--white);
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .footer-description {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      color: var(--white);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: var(--golden-sand);
      transform: translateY(-2px);
    }

    .footer-links {
      list-style: none;
      padding: 0;
    }

    .footer-links li {
      margin-bottom: 0.5rem;
    }

    .footer-links a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: var(--golden-sand);
    }

    .contact-info {
      margin-bottom: 1.5rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      color: rgba(255, 255, 255, 0.8);
    }

    .contact-item .material-icons {
      font-size: 1.2rem;
      color: var(--golden-sand);
    }

    .app-download h5 {
      margin-bottom: 0.75rem;
    }

    .download-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: var(--white);
      text-decoration: none;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .download-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .download-btn .material-icons {
      font-size: 1.5rem;
      color: var(--golden-sand);
    }

    .download-btn div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .download-btn small {
      font-size: 0.75rem;
      opacity: 0.8;
    }

    .newsletter-section {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .newsletter-content {
      flex: 1;
    }

    .newsletter-content h4 {
      margin-bottom: 0.5rem;
    }

    .newsletter-content p {
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }

    .newsletter-form {
      display: flex;
      gap: 1rem;
      flex: 1;
      max-width: 400px;
    }

    .newsletter-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: var(--white);
      font-size: 1rem;
    }

    .newsletter-input::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    .newsletter-input:focus {
      outline: none;
      border-color: var(--golden-sand);
      background: rgba(255, 255, 255, 0.15);
    }

    .newsletter-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: var(--golden-sand);
      color: var(--white);
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .newsletter-btn:hover {
      background: #E6B887;
      transform: translateY(-2px);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 1.5rem;
    }

    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgba(255, 255, 255, 0.8);
    }

    .footer-bottom-links {
      display: flex;
      gap: 2rem;
    }

    .footer-bottom-links a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    .footer-bottom-links a:hover {
      color: var(--golden-sand);
    }

    @media (max-width: 1024px) {
      .footer-main {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }

      .newsletter-section {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
      }

      .newsletter-form {
        max-width: 100%;
      }
    }

    @media (max-width: 768px) {
      .footer-main {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .newsletter-form {
        flex-direction: column;
      }

      .footer-bottom-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .footer-bottom-links {
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .footer-content {
        padding: 2rem 0 1rem;
      }

      .newsletter-section {
        padding: 1.5rem;
      }

      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  onNewsletterSubmit(event: Event) {
    event.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription submitted');
    // You can add actual newsletter subscription logic here
  }
}
