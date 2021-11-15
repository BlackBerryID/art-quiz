export default class CustomAudio {
  constructor(src) {
    this.audio = new Audio(src);
  }

  play() {
    this.audio.currentTime = 0;
    this.audio.play();
  }
}
