import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/splash/splash.component').then(m => m.SplashComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'attractions',
    loadComponent: () => import('./components/attractions/attractions.component').then(m => m.AttractionsComponent)
  },
  {
    path: 'attractions/:id',
    loadComponent: () => import('./components/attraction-details/attraction-details.component').then(m => m.AttractionDetailsComponent)
  },
  {
    path: 'hotels',
    loadComponent: () => import('./components/hotels/hotels.component').then(m => m.HotelsComponent)
  },
  {
    path: 'restaurants',
    loadComponent: () => import('./components/restaurants/restaurants.component').then(m => m.RestaurantsComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./components/events/events.component').then(m => m.EventsComponent)
  },
  {
    path: 'itineraries',
    loadComponent: () => import('./components/itineraries/itineraries.component').then(m => m.ItinerariesComponent)
  },
  {
    path: 'visitor-info',
    loadComponent: () => import('./components/visitor-info/visitor-info.component').then(m => m.VisitorInfoComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./components/blogdetails/blogdetails.component').then(m => m.BlogdetailsComponent)
  },
  {
    path: 'map',
    loadComponent: () => import('./components/map/map.component').then(m => m.MapComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
