import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ATTRACTIONS } from '../data/attractions';
import { tourGuides } from '../data/tourguide';
import { photographers } from '../data/photographe';

export interface ChatMessage { role: 'user' | 'assistant' | 'system'; content: string }
export interface ChatResponse { reply: string; raw?: any }

@Injectable({ providedIn: 'root' })
export class GmaniaService {
  // Configure these in environment.ts if you have a real endpoint/key
  private endpoint = (window as any).__GMANIA_ENDPOINT || '';
  private apiKey = (window as any).__GMANIA_API_KEY || '';

  constructor(private http: HttpClient) {}

  // Try to extract a readable reply from various API response shapes
  private extractReply(resp: any): string {
    if (!resp) return '';
    // Common Gemini-ish shapes
    // 1) { candidates: [{ content: '...' }, ...] } or candidates[0].content.text
    if (Array.isArray(resp?.candidates) && resp.candidates[0]?.content) {
      if (typeof resp.candidates[0].content === 'string') return resp.candidates[0].content;
      if (resp.candidates[0].content?.text) return resp.candidates[0].content.text;
      return JSON.stringify(resp.candidates[0].content);
    }
    // 2) { output: 'text' } or { output: { text: '...' } }
    if (typeof resp.output === 'string') return resp.output;
    if (resp.output?.text) return resp.output.text;
    // 3) { output: [{ content: '...' }] }
    if (Array.isArray(resp.output) && resp.output[0]?.content) return resp.output[0].content;
  // 4) some APIs return messages or reply
    if (resp.reply) return resp.reply;
    if (resp.message) return resp.message;
  // 5) Google Gemini may return output[].content or output_text
  if (Array.isArray(resp?.output) && resp.output[0]?.content) return resp.output[0].content;
  if (resp.output_text) return resp.output_text;
    // Fallback: stringify
    try { return JSON.stringify(resp); } catch (e) { return String(resp); }
  }

  sendMessage(messages: ChatMessage[], contextChunks?: any[], language: string = 'en'): Observable<ChatResponse> {
    // If no endpoint provided, return a local stub based on keyword matching
    if (!this.endpoint) {
      return of(this.localStub(messages, contextChunks, language));
    }

    // Real request shape depends on Gmania API — make this configurable.
    // Default request body (used for local/backends that expect messages)
    let requestBody: any = { messages, context: contextChunks || [], language };

    // If target is Google Generative Language API, construct a single input.text
    // by joining the conversation. This often matches Gemini's simple generateContent input.
    try {
      if (this.endpoint && this.endpoint.includes('generativelanguage.googleapis.com')) {
        const convo = (messages || []).map(m => {
          const who = m.role === 'user' ? 'User' : (m.role === 'assistant' ? 'Assistant' : 'System');
          return `${who}: ${m.content}`;
        }).join('\n\n');
        // Gemini/generativeLanguage generateContent expects a 'prompt' object with 'text'
        requestBody = { model: 'gemini-2.0-flash', prompt: { text: convo }, temperature: 0.2 };
      }
    } catch (e) {
      requestBody = { messages, context: contextChunks || [], language };
    }
    // Build headers conditionally: only include Authorization if apiKey present.
    const headersObj: { [k: string]: string } = { 'Content-Type': 'application/json' };
    if (this.apiKey) { headersObj['Authorization'] = `Bearer ${this.apiKey}`; }
    const headers = new HttpHeaders(headersObj);
    return this.http.post<any>(this.endpoint, requestBody, { headers }).pipe(
      map(resp => ({ reply: this.extractReply(resp), raw: resp })),
      catchError(err => {
        // Log full error for debugging (network/response body)
        console.error('Gmania API error', err);
        // Try to extract meaningful server message from the error body
        let serverMsg = '';
        try {
          if (err && err.error) {
            // err.error may be an object with a message or details
            serverMsg = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
          }
        } catch (e) {
          serverMsg = '';
        }
        const userMsg = language === 'ar'
          ? `خطأ في الاتصال بخدمة المحادثة: ${err.message || err.statusText}${serverMsg ? ' - ' + serverMsg : ''}`
          : `Chat service connection error: ${err.message || err.statusText}${serverMsg ? ' - ' + serverMsg : ''}`;
        return of({ reply: userMsg, raw: err });
      })
    );
  }

  // Simple local stub: scans last user message for keywords and returns data snippets
  private localStub(messages: ChatMessage[], _context?: any[], language: string = 'en'): ChatResponse {
    const last = messages.slice().reverse().find(m => m.role === 'user');
    const q = (last?.content || '').toLowerCase();

    const isAr = language === 'ar';

    // match attractions by name or keyword
    for (const a of ATTRACTIONS as any[]) {
      const nameEn = (a.name?.en || '').toLowerCase();
      const nameAr = (a.name?.ar || '').toLowerCase();
      if (q.includes(nameEn) || q.includes(nameAr)) {
        const name = isAr ? (a.name?.ar || a.name?.en) : (a.name?.en || a.name?.ar);
        const desc = isAr ? (a.description?.ar || a.description?.en || '') : (a.description?.en || a.description?.ar || '');
        const hours = isAr ? (a.openingHours?.ar || a.openingHours?.en || '') : (a.openingHours?.en || a.openingHours?.ar || '');
        const ticket = isAr ? (a.ticketPrice?.ar || a.ticketPrice?.en || '') : (a.ticketPrice?.en || a.ticketPrice?.ar || '');
        const coords = `${a.latitude || ''},${a.longitude || ''}`;
        if (isAr) {
          return { reply: `${name}\n${desc.split('\n').slice(0,3).join('\n')}\nساعات العمل: ${hours || 'غير متوفر'}\nسعر التذكرة: ${ticket || 'غير متوفر'}\nموقع: ${coords}` };
        }
        return { reply: `${name}\n${desc.split('\n').slice(0,3).join('\n')}\nOpening hours: ${hours || 'N/A'}\nTicket: ${ticket || 'N/A'}\nLocation: ${coords}` };
      }
    }

    // match tour guides
    for (const t of tourGuides as any[]) {
      const nameEn = (t.name?.en || '').toLowerCase();
      const nameAr = (t.name?.ar || '').toLowerCase();
      if (q.includes(nameEn) || q.includes(nameAr) || q.includes('مرشد') || q.includes('tour guide')) {
        const name = isAr ? (t.name?.ar || t.name?.en) : (t.name?.en || t.name?.ar);
        const bio = isAr ? (t.bio?.ar || t.bio?.en || '') : (t.bio?.en || t.bio?.ar || '');
        const phone = isAr ? (t.phone?.ar || t.phone?.en || '') : (t.phone?.en || t.phone?.ar || '');
        if (isAr) {
          return { reply: `دليل سياحي: ${name}\n${bio}\nالهاتف: ${phone || 'غير متوفر'}` };
        }
        return { reply: `Tour Guide: ${name}\n${bio}\nPhone: ${phone || 'N/A'}` };
      }
    }

    // match photographers
    for (const p of photographers as any[]) {
      const nameEn = (p.name?.en || '').toLowerCase();
      const nameAr = (p.name?.ar || '').toLowerCase();
      if (q.includes(nameEn) || q.includes(nameAr) || q.includes('مصور') || q.includes('photograph')) {
        const name = isAr ? (p.name?.ar || p.name?.en) : (p.name?.en || p.name?.ar);
        const bio = isAr ? (p.bio?.ar || p.bio?.en || '') : (p.bio?.en || p.bio?.ar || '');
        const phone = isAr ? (p.phone?.ar || p.phone?.en || '') : (p.phone?.en || p.phone?.ar || '');
        if (isAr) {
          return { reply: `مصوّر: ${name}\n${bio}\nالهاتف: ${phone || 'غير متوفر'}` };
        }
        return { reply: `Photographer: ${name}\n${bio}\nPhone: ${phone || 'N/A'}` };
      }
    }

    // fallback: give short intro and offer options
    if (isAr) {
      return { reply: `أنا مساعد سياحي عن محافظة المنيا. أقدر أقدملك معلومات عن المعالم، المتاحف، المطاعم، الأدلة السياحية أو المصوّرين. اسأل عن مكان معين أو اطلب اقتراح لرحلة.` };
    }
    return { reply: `I am a tourism assistant for Minya. I can provide information about attractions, museums, restaurants, tour guides, and photographers. Ask about a specific place or request a trip suggestion.` };
  }
}

// Helper to extract a readable reply from various API response shapes
function tryGet(obj: any, path: string) {
  try {
    return path.split('.').reduce((a, k) => (a && a[k] !== undefined) ? a[k] : undefined, obj);
  } catch (e) { return undefined; }
}

// Add method on prototype via declaration merge (since service is a class, add as function above export would be messy).
