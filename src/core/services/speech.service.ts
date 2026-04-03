import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  private platformId = inject(PLATFORM_ID);

  private _isSpeaking = signal(false);
  private _currentText = signal<string | null>(null);

  readonly isSpeaking = this._isSpeaking.asReadonly();
  readonly currentText = this._currentText.asReadonly();

  private get synth(): SpeechSynthesis | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return window.speechSynthesis;
  }

  toggle(text?: string): void {
    const speechSynth = this.synth;
    if (!speechSynth) return;

    if (this._isSpeaking()) {
      this.stop();
    } else if (text) {
      this.speak(text);
    }
  }

  speak(text: string, rate: number = 0.9, pitch: number = 1.0): void {
    const speechSynth = this.synth;
    if (!speechSynth) return;

    speechSynth.cancel();
    this._currentText.set(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;

    const voices = speechSynth.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith('es') && v.localService
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
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

  speakSentence(words: string[], rate: number = 0.9, pitch: number = 1.0): void {
    const sentence = words.join(' ');
    this.speak(sentence, rate, pitch);
  }
}
