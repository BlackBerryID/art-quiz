export default class Settings {
  constructor() {
    this.settingsSection = document.querySelector(".settings");
    this.initialMenu = document.querySelector(".initial");
    this.volumeBtn = document.querySelector(".volume-icon");
    this.volumeBar = document.querySelector(".volume-bar");
    this.timeInput = document.querySelector(".time-amount-input");
    this.timeGameToggle = document.querySelector(".checkbox");
    this.backButton = document.querySelector(".settings-btn-back");
    this.player = new Audio("../assets/mp3/push.mp3");
    this.settingsData = localStorage.getItem("settingsData") || {};

    this.volumeBar.addEventListener("input", this.changeVolume.bind(this));
    this.backButton.addEventListener("click", () => this.goBack());
    this.volumeBtn.addEventListener(
      "click",
      this.toggleVolumeButton.bind(this)
    );
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

  toggleVolumeButton() {
    this.player.currentTime = 0;
    if (this.player.muted) {
      this.volumeBar.value = 0.5;
      this.changeVolume();
    } else {
      this.volumeBar.value = 0;
      this.changeVolume();
    }
  }

  changeVolume() {
    const value = this.volumeBar.value * 100;
    this.volumeBar.style.background = `linear-gradient(to right, #ffbb98 0%, #ffbb98 ${value}%, rgba(52, 70, 72, 0.1) ${value}%, rgba(52, 70, 72, 0.1) 100%)`;
    this.player.volume = this.volumeBar.value;
    if (this.player.volume === 0) {
      this.player.muted = true;
    } else {
      this.player.muted = false;
    }
    this.toggleVolumeIcon();
    this.player.play();
  }

  toggleVolumeIcon() {
    if (this.player.volume === 0 || this.player.muted) {
      this.volumeBtn.style.background = "url(./assets/svg/volume-muted.svg)";
      this.volumeBtn.style.marginTop = "0.15rem";
    } else {
      this.volumeBtn.style.background = "url(./assets/svg/volume.svg)";
      this.volumeBtn.style.marginTop = "0";
    }
  }
}
