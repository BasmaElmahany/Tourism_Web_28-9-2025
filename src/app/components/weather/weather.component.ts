import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherData } from '../../services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input() city = 'Minya';
  @Input() openInfo = false;
  weather: WeatherData | null = null;
  loading = false;
  showTourismInfo = false;

  constructor(private weatherService: WeatherService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.fetch();
    // If the host component requests the tourism info to be open, show it
    this.showTourismInfo = !!this.openInfo;
  }

  toggleTourismInfo() {
    this.showTourismInfo = !this.showTourismInfo;
  }

  fetch() {
    this.loading = true;
    this.weatherService.getCurrentWeather(this.city).subscribe(res => {
      this.weather = res;
      this.loading = false;
    });
  }
}
