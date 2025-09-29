import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourismService } from '../../services/tourism.service';
import { Attraction } from '../../models/tourism.models';


@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent implements OnInit {
  attractions: Attraction[] = [];
  filteredAttractions: Attraction[] = [];
  totalAttractions: number = 0;
  loading: boolean = true;
  searchQuery: string = '';
  selectedCategory: string = '';
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private tourismService: TourismService) {}

  ngOnInit(): void {
    this.tourismService.getAttractions().subscribe((attractions) => {
      this.attractions = attractions;
      this.totalAttractions = attractions.length;
      this.filteredAttractions = attractions;
      this.loading = false;
    });
  }

  onSearch(): void {
    this.filterAttractions();
  }

  onFilterChange(): void {
    this.filterAttractions();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.filterAttractions();
  }

  filterAttractions(): void {
    let filtered = this.attractions;
    if (this.searchQuery) {
      filtered = filtered.filter(a => a.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
    if (this.selectedCategory) {
      filtered = filtered.filter(a => a.category === this.selectedCategory);
    }
    this.filteredAttractions = filtered;
  }

  addToFavorites(attraction: Attraction) {
    // Implement favorites functionality
    console.log('Added to favorites:', attraction.name);
    // You can add actual favorites logic here
  }

  trackByAttractionId(index: number, attraction: Attraction): string {
    return attraction.id;
  }
}
