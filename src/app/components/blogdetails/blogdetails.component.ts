import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost, LocalizedText } from 'src/app/models/tourism.models';
import { TourismService } from 'src/app/services/tourism.service';
import { I18nService } from 'src/app/services/i18n.service';


@Component({
  selector: 'app-blogdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent implements OnInit {
  post$?: Observable<BlogPost | undefined>;

  constructor(
    private route: ActivatedRoute,
    private tourism: TourismService,
    public i18nService: I18nService
  ) {}

  getLocalizedText(text: LocalizedText | undefined): string {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return this.i18nService.getCurrentLanguage() === 'ar' ? text.ar : text.en;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.post$ = this.tourism.getBlogPostById(id);
    }
  }

}
