import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="splash-container">
      <div class="splash-background"></div>
      <div class="splash-pattern"></div>
      
      <div class="splash-content" [class.fade-in]="showContent">
        <div class="logo-container" [class.scale-in]="showLogo">
          <img src="/assets/images/app_icon.png" alt="Minya Tourism" class="splash-logo">
        </div>
        
        <div class="text-container" [class.slide-up]="showText">
          <h1 class="splash-title">Minya Tourism</h1>
          <p class="splash-subtitle">Discover Ancient Egypt</p>
        </div>
        
        <div class="loading-container" [class.fade-in]="showLoading">
          <div class="loading-spinner"></div>
          <p class="loading-text">Exploring the treasures of Minya...</p>
        </div>
      </div>
      
      <div class="splash-footer" [class.fade-in]="showFooter">
        <p>Experience the timeless beauty of the Nile</p>
      </div>
    </div>
  `,
  styles: [`
    .splash-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      z-index: 9999;
    }

    .splash-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, 
        #1A365D 0%, 
        #2D5A87 40%, 
        #D4A574 100%
      );
    }

    .splash-pattern {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('/assets/images/pattern_bg.png');
      background-repeat: repeat;
      background-size: 300px;
      opacity: 0.1;
    }

    .splash-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      color: white;
    }

    .logo-container {
      margin-bottom: 2rem;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .logo-container.scale-in {
      opacity: 1;
      transform: scale(1);
    }

    .splash-logo {
      width: 120px;
      height: 120px;
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      filter: drop-shadow(0 0 20px rgba(212, 165, 116, 0.5));
    }

    .text-container {
      margin-bottom: 3rem;
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out 0.3s;
    }

    .text-container.slide-up {
      opacity: 1;
      transform: translateY(0);
    }

    .splash-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(45deg, #ffffff, #D4A574);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 2px;
    }

    .splash-subtitle {
      font-size: 1.25rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.9);
      letter-spacing: 1px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      opacity: 0;
      transition: opacity 0.6s ease-out 0.6s;
    }

    .loading-container.fade-in {
      opacity: 1;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid #D4A574;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .loading-text {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 300;
    }

    .splash-footer {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.6s ease-out 0.9s;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
      font-weight: 300;
      letter-spacing: 0.5px;
    }

    .splash-footer.fade-in {
      opacity: 1;
    }

    .fade-in {
      opacity: 1;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .splash-title {
        font-size: 2.5rem;
      }

      .splash-subtitle {
        font-size: 1.1rem;
      }

      .splash-logo {
        width: 100px;
        height: 100px;
      }

      .splash-footer {
        bottom: 2rem;
        padding: 0 1rem;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .splash-title {
        font-size: 2rem;
      }

      .splash-subtitle {
        font-size: 1rem;
      }

      .splash-logo {
        width: 80px;
        height: 80px;
      }
    }
  `]
})
export class SplashComponent implements OnInit {
  showContent = false;
  showLogo = false;
  showText = false;
  showLoading = false;
  showFooter = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Animate elements in sequence
    setTimeout(() => this.showContent = true, 100);
    setTimeout(() => this.showLogo = true, 300);
    setTimeout(() => this.showText = true, 800);
    setTimeout(() => this.showLoading = true, 1300);
    setTimeout(() => this.showFooter = true, 1800);

    // Navigate to home after animation completes
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 4000);
  }
}
