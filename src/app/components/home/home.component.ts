import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TourismService } from '../../services/tourism.service';
import { Attraction, Hotel, Restaurant, Event, BlogPost } from '../../models/tourism.models';
import { I18nService } from 'src/app/services/i18n.service';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatbotComponent, WeatherComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredAttractions: Attraction[] = [];
  latestBlogPosts: BlogPost[] = [];
  currentSlide = 0;
  showChat = false;

  constructor(private tourismService: TourismService, public i18n: I18nService) {}

  ngOnInit() {
    this.loadFeaturedAttractions();
    this.loadLatestBlogPosts();
  }

  private loadFeaturedAttractions() {
    this.tourismService.getAttractions().subscribe(attractions => {
      this.featuredAttractions = attractions.slice(0, 4); // Show first 4 attractions
    });
  }

  private loadLatestBlogPosts() {
    this.tourismService.getBlogPosts().subscribe(posts => {
      this.latestBlogPosts = posts.slice(0, 2); // Show first 2 blog posts
    });
  }

  nextSlide() {
    if (this.currentSlide < this.featuredAttractions.length - 1) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  toggleChat() { this.showChat = !this.showChat }
}
