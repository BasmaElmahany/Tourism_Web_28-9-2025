import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
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
