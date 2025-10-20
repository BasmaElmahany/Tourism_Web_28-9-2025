import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
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
  readProgress = 0;

  constructor(
    private route: ActivatedRoute,
    private tourism: TourismService,
    public i18nService: I18nService,
    @Inject(DOCUMENT) private doc: Document
  ) {}
  // ✅ make it a method (not a property initializer)
  handleScroll(): void {
    const root = this.doc.documentElement;
    const scrollTop = (this.doc.defaultView?.pageYOffset ?? 0) || root.scrollTop || 0;
    const scrollHeight = (root.scrollHeight - root.clientHeight) || 1;
    this.readProgress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
  }

  getLocalizedText(text: LocalizedText | undefined): string {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return this.i18nService.getCurrentLanguage() === 'ar' ? text.ar : text.en;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.post$ = this.tourism.getBlogPostById(id);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }
  ngOnDestroy() { window.removeEventListener('scroll', this.handleScroll as any); }

  // ===== Sharing =====
  async share(post: BlogPost) {
    const title = this.getLocalizedText(post.title) || this.i18nService.translate('blogTitle');
    const text =
      this.getLocalizedText(post.excerpt) ||
      this.i18nService.translate('shareDefaultText') ||
      '';
    const url = this.doc.location.href;

    // Web Share (mobile / modern)
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title, text, url });
        return;
      } catch {
        // fall back to buttons if user cancels
      }
    }
    // If Web Share not supported, do nothing here (buttons below handle per-platform)
  }

  openShare(platform: 'facebook'|'x'|'whatsapp'|'telegram'|'linkedin'|'email', post: BlogPost) {
    const title = encodeURIComponent(this.getLocalizedText(post.title) || '');
    const text  = encodeURIComponent(this.getLocalizedText(post.excerpt) || '');
    const url   = encodeURIComponent(this.doc.location.href);

    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x:        `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%20-%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`,
      email:    `mailto:?subject=${title}&body=${text}%0A%0A${url}`
    };

    const shareUrl = links[platform];
    if (!shareUrl) return;

    // open centered popup (except mailto/whatsapp on desktop may just open new tab or app)
    const w = 600, h = 540;
    const y = window.top?.outerHeight ? (window.top.outerHeight - h) / 2 : 100;
    const x = window.top?.outerWidth  ? (window.top.outerWidth  - w) / 2 : 100;
    window.open(
      shareUrl,
      '_blank',
      `noopener,noreferrer,width=${w},height=${h},left=${x},top=${y}`
    );
  }

  async copyLink() {
    const url = this.doc.location.href;
    try {
      await navigator.clipboard.writeText(url);
      // you can replace alert with a toast
      alert(this.i18nService.translate('linkCopied') || 'Link copied!');
    } catch {
      // fallback
      prompt(this.i18nService.translate('copyLinkPrompt') || 'Copy this link:', url);
    }
  }
}
