import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  private platformId = inject(PLATFORM_ID);

  private _isSpeaking = signal(false);
  private _currentText = signal<string | null>(null);

  // New signals for preferences
  private _rate = signal(0.9);
  private _pitch = signal(1.0);
  private _selectedVoiceName = signal<string | null>(null);
  private _voices = signal<SpeechSynthesisVoice[]>([]);

  readonly isSpeaking = this._isSpeaking.asReadonly();
  readonly currentText = this._currentText.asReadonly();
  readonly rate = this._rate.asReadonly();
  readonly pitch = this._pitch.asReadonly();
  readonly selectedVoiceName = this._selectedVoiceName.asReadonly();
  readonly voices = this._voices.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initVoices();
      // Voices can be loaded asynchronously
      window.speechSynthesis.onvoiceschanged = () => this.initVoices();
    }
  }

  private initVoices(): void {
    const v = window.speechSynthesis.getVoices();
    this._voices.set(v);
    if (!this._selectedVoiceName()) {
      const defaultVoice = v.find(v => v.lang.startsWith('es')) || v[0];
      if (defaultVoice) this._selectedVoiceName.set(defaultVoice.name);
    }
  }

  setRate(value: number): void {
    this._rate.set(value);
  }

  setPitch(value: number): void {
    this._pitch.set(value);
  }

  setSelectedVoice(name: string): void {
    this._selectedVoiceName.set(name);
  }

  private get synth(): SpeechSynthesis | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return window.speechSynthesis;
  }

  toggle(text?: string): void {
    if (this._isSpeaking()) {
      this.stop();
    } else if (text) {
      this.speak(text);
    }
  }

  speak(text: string, rate?: number, pitch?: number): void {
    const speechSynth = this.synth;
    if (!speechSynth) return;

    speechSynth.cancel();
    this._currentText.set(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate ?? this._rate();
    utterance.pitch = pitch ?? this._pitch();
    utterance.volume = 1.0;

    const voices = this._voices();
    const voice = voices.find(v => v.name === this._selectedVoiceName());
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => this._isSpeaking.set(true);
    utterance.onend = () => this._isSpeaking.set(false);
    utterance.onerror = () => this._isSpeaking.set(false);

    speechSynth.speak(utterance);
  }

  stop(): void {
    const speechSynth = this.synth;
    if (!speechSynth) return;
    speechSynth.cancel();
    this._isSpeaking.set(false);
  }

  speakSentence(words: string[], rate?: number, pitch?: number): void {
    const sentence = words.join(' ');
    this.speak(sentence, rate, pitch);
  }
}
