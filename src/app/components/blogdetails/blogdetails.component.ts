import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
export class BlogdetailsComponent implements OnInit, OnDestroy {
  post$?: Observable<BlogPost | undefined>;
  readProgress = 0;

  // modal & helpers
  currentPost?: BlogPost | undefined;
  shareModalOpen = false;
  toastMessage = '';

  // POPOVER state
  popoverOpen = false;

  private toastTimeout: any;
  private postSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private tourism: TourismService,
    public i18nService: I18nService,
    @Inject(DOCUMENT) public doc: Document
  ) {}

  // keep 'this' binding for event listeners
  handleScroll = (): void => {
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

  /**
   * Flexible translation helper to avoid TypeScript errors for keys not present in
   * the strict TranslationKeys type. Uses a safe any-call to the service.
   */
  getTranslation(key: string): string {
    try {
      return (this.i18nService as any).translate(key) ?? '';
    } catch {
      return '';
    }
  }

  // document click handler to close popover when user clicks outside
  private onDocClick = (): void => {
    if (this.popoverOpen) this.popoverOpen = false;
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.post$ = this.tourism.getBlogPostById(id);
      this.postSub = this.post$.subscribe(p => this.currentPost = p);
    }
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    // close popover when clicking outside
    document.addEventListener('click', this.onDocClick);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll as any);
    if (this.postSub) this.postSub.unsubscribe();
    if (this.toastTimeout) clearTimeout(this.toastTimeout);

    document.removeEventListener('click', this.onDocClick);
  }

  openShareModal(): void {
    this.shareModalOpen = true;
    // prevent background scroll while modal open
    this.doc.documentElement.style.overflow = 'hidden';
    this.doc.body.style.overflow = 'hidden';
  }

  closeShareModal(): void {
    this.shareModalOpen = false;
    this.doc.documentElement.style.overflow = '';
    this.doc.body.style.overflow = '';
  }

  /**
   * Toggle the horizontal popover (used for inline share menu).
   * Stops propagation so the document click listener doesn't immediately close it.
   */
  togglePopover(event: Event, post?: BlogPost): void {
    event.stopPropagation();
    this.currentPost = post || this.currentPost;
    this.popoverOpen = !this.popoverOpen;
  }

  /**
   * Supports more platforms: facebook, x, whatsapp, telegram, linkedin, email,
   * pinterest, reddit, tumblr, sms
   */
  openShare(
    platform: 'facebook'|'x'|'whatsapp'|'telegram'|'linkedin'|'email'|'pinterest'|'reddit'|'tumblr'|'sms',
    post?: BlogPost
  ): void {
    const usedPost = post || this.currentPost;
    if (!usedPost) return;

    const title = encodeURIComponent(this.getLocalizedText(usedPost.title) || '');
    const text  = encodeURIComponent(this.getLocalizedText(usedPost.excerpt) || '');
    const urlRaw = this.doc.location.href;
    const url   = encodeURIComponent(urlRaw);

    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x:        `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%20-%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`,
      pinterest:`https://pinterest.com/pin/create/button/?url=${url}&description=${title}`,
      reddit:   `https://www.reddit.com/submit?url=${url}&title=${title}`,
      tumblr:   `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&title=${title}`,
      sms:      `sms:?body=${encodeURIComponent(decodeURIComponent(title) + ' - ' + urlRaw)}`,
      email:    `mailto:?subject=${title}&body=${text}%0A%0A${url}`
    };

    const shareUrl = links[platform];
    if (!shareUrl) return;

    // close inline popover after choosing
    this.popoverOpen = false;

    // open centered popup for web platforms (sms/mail will behave differently)
    if (platform === 'sms' || platform === 'email' || platform === 'whatsapp' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // let system handle on mobile
      window.location.href = shareUrl;
      return;
    }

    const w = 700, h = 580;
    const top = window.top?.outerHeight ? (window.top.outerHeight - h) / 2 : 120;
    const left = window.top?.outerWidth ? (window.top.outerWidth - w) / 2 : 120;
    window.open(shareUrl, '_blank', `noopener,noreferrer,width=${w},height=${h},left=${left},top=${top}`);
  }

  async copyLink(event?: Event): Promise<void> {
    if (event) event.stopPropagation();
    const url = this.doc.location.href;
    try {
      await navigator.clipboard.writeText(url);
      this.showToast(this.getTranslation('linkCopied') || this.i18nService.translate('linkCopied') || 'Link copied!');
    } catch {
      const fallback = prompt(this.getTranslation('copyLinkPrompt') || this.i18nService.translate('copyLinkPrompt') || 'Copy this link:', url);
      if (fallback !== null) this.showToast(this.getTranslation('linkCopied') || this.i18nService.translate('linkCopied') || 'Link copied!');
    }
  }

  private showToast(msg: string): void {
    this.toastMessage = msg;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => { this.toastMessage = ''; }, 2400);
  }
}
