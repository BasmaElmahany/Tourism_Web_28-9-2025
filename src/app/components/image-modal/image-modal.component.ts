import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="close.emit()" *ngIf="isOpen">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close.emit()">×</button>

        <div class="carousel" *ngIf="images && images.length > 0">
          <button class="nav prev" (click)="prev($event)" [disabled]="images.length<=1">‹</button>
          <div class="carousel-image-wrapper">
            <img [src]="images[currentIndex]" [alt]="altText || ''" class="modal-image">
          </div>
          <button class="nav next" (click)="next($event)" [disabled]="images.length<=1">›</button>
        </div>

        <div class="thumbnails" *ngIf="images && images.length > 1">
          <img *ngFor="let img of images; let i = index"
               [src]="img"
               [class.active]="i === currentIndex"
               (click)="goTo(i)"
               class="thumb">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      position: relative;
      max-width: 96%;
      max-height: 90vh;
      background: transparent;
      border-radius: 8px;
      overflow: hidden;
    }

    /* Make modal images preserve aspect ratio and never be cropped. */
    .modal-image {
      display: block;
      max-width: 100%;
      max-height: 75vh;
      width: auto;
      height: auto;
      object-fit: contain;
      box-shadow: 0 6px 18px rgba(0,0,0,0.25);
    }

    .carousel {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .carousel-image-wrapper {
      width: 80vw;
      max-width: 1100px;
      max-height: 78vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      padding: 12px; /* small padding so images don't touch edges */
      box-sizing: border-box;
    }

    .nav {
      background: rgba(255,255,255,0.9);
      border: none;
      font-size: 32px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .thumbnails {
      display: flex;
      gap: 8px;
      padding: 8px;
      justify-content: center;
      background: rgba(0,0,0,0.05);
      overflow-x: auto;
    }

    .thumb {
      width: 64px;
      height: 48px;
      object-fit: cover;
      cursor: pointer;
      opacity: 0.7;
      border: 2px solid transparent;
    }

    .thumb.active {
      opacity: 1;
      border-color: #007bff;
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  `]
})
export class ImageModalComponent {
  /** Accept an array of images for carousel support. If single image, pass array with one item. */
  @Input() images: string[] = [];
  @Input() altText: string = '';
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  currentIndex = 0;

  prev(event?: Event) {
    if (event) { event.stopPropagation(); }
    if (!this.images || this.images.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next(event?: Event) {
    if (event) { event.stopPropagation(); }
    if (!this.images || this.images.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goTo(i: number) {
    this.currentIndex = i;
  }
}