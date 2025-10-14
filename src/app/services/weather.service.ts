import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface WeatherData {
  tempC: number;
  description: string;
  icon: string | null;
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeather(city = 'Minya'): Observable<WeatherData | null> {
    const key = (window as any).__OPENWEATHER_API_KEY || '';
    if (!key) return of(null);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
    return this.http.get(url).pipe(
      map((res: any) => ({
        tempC: res?.main?.temp ?? null,
        description: res?.weather?.[0]?.description ?? '',
        icon: res?.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png` : null
      })),
      catchError(() => of(null))
    );
  }
}
