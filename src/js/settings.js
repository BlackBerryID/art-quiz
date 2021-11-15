import CustomAudio from "./customAudio";

export default class Settings {
  constructor() {
    this.settingsSection = document.querySelector(".settings");
    this.initialMenu = document.querySelector(".initial");
    this.volumeBtn = document.querySelector(".volume-icon");
    this.volumeBar = document.querySelector(".volume-bar");
    this.timeInput = document.querySelector(".time-amount-input");
    this.timeGameToggle = document.querySelector(".checkbox");
    this.backButton = document.querySelector(".settings-btn-back");
    this.player = new CustomAudio("../assets/mp3/push.mp3");

    this.volumeBar.addEventListener("input", function () {
      const value = this.value * 100;
      this.style.background = `linear-gradient(to right, #ffbb98 0%, #ffbb98 ${value}%, rgba(52, 70, 72, 0.1) ${value}%, rgba(52, 70, 72, 0.1) 100%)`;
    });
    this.volumeBar.addEventListener("input", () => {
      this.player.play();
    });
    this.backButton.addEventListener("click", () => this.goBack());
  }

  goBack() {
    this.settingsSection.style.setProperty("pointer-events", "none");
    this.settingsSection.style.setProperty("opacity", "0");
    setTimeout(showMenuPage.bind(this), 200);
    function showMenuPage() {
      this.settingsSection.style.setProperty("display", "none");
      this.settingsSection.style.setProperty("pointer-events", "initial");
      this.initialMenu.style.setProperty("display", "block");
      setTimeout(() => this.initialMenu.style.setProperty("opacity", "1"), 50);
    }
    this.player.play();
  }
}
