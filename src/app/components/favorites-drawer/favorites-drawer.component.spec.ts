import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesDrawerComponent } from './favorites-drawer.component';

describe('FavoritesDrawerComponent', () => {
  let component: FavoritesDrawerComponent;
  let fixture: ComponentFixture<FavoritesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
