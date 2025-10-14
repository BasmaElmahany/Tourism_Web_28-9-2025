import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  messages: { sender: string; from: string; text: string }[] = [];
  input: string = '';
  loading: boolean = false;
  showChat: boolean = false;
  avatarDataUrl: string | null = null;
  hasSeenHelper = false;

  // optional lock to prevent double toggle (safety)
  private _toggleLocked = false;

  constructor(
    private http: HttpClient,
    public i18n: I18nService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    try { this.hasSeenHelper = !!localStorage.getItem('chat_helper_seen'); } catch (e) { this.hasSeenHelper = false; }
  }

  toggleChat() {
    // safety: prevent very quick double-calls (shouldn't be needed with click-only, but harmless)
    if (this._toggleLocked) return;
    this._toggleLocked = true;
    setTimeout(() => this._toggleLocked = false, 250);

    this.showChat = !this.showChat;
    try { localStorage.setItem('chat_helper_seen', '1'); } catch (e) {}
    try { this.cdr.detectChanges(); } catch (e) {}
  }

  openChatFromHelper() {
    this.showChat = true;
    this.hasSeenHelper = true;
    try { localStorage.setItem('chat_helper_seen', '1'); } catch (e) {}
  }

  dismissHelper(e: Event) {
    e.stopPropagation();
    this.hasSeenHelper = true;
    try { localStorage.setItem('chat_helper_seen', '1'); } catch (err) {}
  }

  onAvatarFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.avatarDataUrl = reader.result as string; };
    reader.readAsDataURL(file);
  }

  triggerAvatarUpload() {
    const el = document.querySelector<HTMLInputElement>('#avatarFileInput');
    if (el) el.click();
  }

  promptForAvatarUrl() {
    const url = prompt('ضع رابط صورة الأفاتار (URL)');
    if (url) this.avatarDataUrl = url;
  }

  send() { this.sendMessage(); }

  resize(el: HTMLTextAreaElement) {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  sendMessage() {
    if (!this.input.trim()) return;
    const userMsg = this.input;
    this.messages.push({ sender: 'user', from: 'user', text: userMsg });
    this.loading = true;

    const inputIsArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(userMsg);

    const projectContextAr = `أنت مساعد سياحي لمدينة المنيا وموقع سياحي رسمي. أجب بالعربية وبشكل موجز ومفيد. يمكنك توفير معلومات عن المعالم السياحية، الفنادق، المطاعم، المواصلات، الأنشطة اليومية، الأسعار التقريبية ومواعيد الزيارة. عند طلب حجز أو تفاصيل اتصال أرجع معلومات الاتصال المتوفرة. إذا سأل المستخدم عن شيء خارج السياحة، أجب بلباقة أنك مختص بالمعلومات السياحية فقط.`;
    const projectContextEn = `You are a tourism assistant for Minya and this tourism website. Answer in English concisely and helpfully. Provide information about attractions, hotels, restaurants, transportation, activities, approximate prices and opening hours. When asked for contact or booking details, return available contact information. If the user asks about unrelated topics, politely state you only handle tourism-related queries.`;

    const projectContext = inputIsArabic ? projectContextAr : projectContextEn;
    const prompt = inputIsArabic
      ? `${projectContext}\n\nسؤال المستخدم: ${userMsg}`
      : `${projectContext}\n\nUser question: ${userMsg}`;

    const endpoint = (window as any).__GMANIA_ENDPOINT || '';
    const body = endpoint && endpoint.includes('generativelanguage.googleapis.com')
      ? { contents: [{ parts: [{ text: prompt }] }] }
      : { messages: [{ role: 'user', content: prompt }] };

    const url = endpoint || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAHEb7DYVPzAmc9q-7CGo-L74F0BCUBZX0';

    this.http.post(url, body).subscribe({
      next: (res: any) => {
        const botReply = res?.candidates?.[0]?.content?.parts?.[0]?.text
          || res?.candidates?.[0]?.content?.text
          || res?.output_text
          || res?.reply
          || 'عذراً، لم أفهم. / Sorry, I did not understand.';
        this.messages.push({ sender: 'bot', from: 'bot', text: botReply });
        this.loading = false;
      },
      error: (err) => {
        console.error('Chat error', err);
        this.messages.push({ sender: 'bot', from: 'bot', text: inputIsArabic ? 'حدث خطأ في الاتصال بخدمة الدردشة.' : 'Sorry, there was a problem connecting to the chat service.' });
        this.loading = false;
      }
    });

    this.input = '';
  }
}
