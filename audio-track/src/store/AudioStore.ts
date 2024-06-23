import { action, computed, makeObservable, observable } from "mobx";

class AudioStore {
  audio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;

  constructor() {
    makeObservable(this, {
      isPlaying: observable,
      currentTime: observable,
      duration: observable,
      setCurrentTime: action,
      setDuration: action,
      togglePlay: action,
      initAudio: action,
      remainingTime: computed,
    });
  }

  get remainingTime(): number {
    return this.duration - this.currentTime;
  }

  initAudio(src: string) {
    this.audio = new Audio(src);
    this.audio.addEventListener("loadedmetadata", () => {
      this.setDuration(this.audio!.duration);
    });
    this.audio.addEventListener("timeupdate", () => {
      this.setCurrentTime(this.audio!.currentTime);
    });
    this.audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
    });
  }

  setCurrentTime(time: number) {
    this.currentTime = time;
  }

  setDuration(duration: number) {
    this.duration = duration;
  }

  togglePlay() {
    if (this.audio) {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play().catch((e) => console.error("Playback failed:", e));
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

export const audioStore = new AudioStore();
