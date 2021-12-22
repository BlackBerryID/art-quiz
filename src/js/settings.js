import { settingsData } from "../index";

export default class Settings {
  constructor() {
    this.settingsSection = document.querySelector(".settings");
    this.initialMenu = document.querySelector(".initial");
    this.volumeBtn = document.querySelector(".volume-icon");
    this.volumeBar = document.querySelector(".volume-bar");
    this.timeInput = document.querySelector(".time-amount-input");
    this.timeGameToggle = document.querySelector(".checkbox");
    this.backButton = document.querySelector(".settings-btn-back");
    this.categoryPage = document.querySelector(".categories");
    this.player = new Audio("../assets/mp3/push.mp3");
    this.previousVolume;
  }

  addEventListeners() {
    this.volumeBar.addEventListener("input", () => {
      this.changeVolume();
      this.play();
    });
    this.volumeBtn.addEventListener("click", () => {
      this.toggleVolumeButton();
      this.play();
    });
    this.backButton.addEventListener("click", () => {
      this.goBack(settingsData.prevPage);
      this.writeSettingsData();
    });
    window.addEventListener("beforeunload", this.writeSettingsData.bind(this));
  }

  goBack(prevPage) {
    let page = prevPage === "menu" ? this.initialMenu : this.categoryPage;
    this.settingsSection.style.setProperty("pointer-events", "none");
    this.settingsSection.style.setProperty("opacity", "0");
    setTimeout(showMenuPage.bind(this), 200);
    function showMenuPage() {
      this.settingsSection.style.setProperty("display", "none");
      this.settingsSection.style.setProperty("pointer-events", "initial");
      page.style.setProperty("display", "block");
      setTimeout(() => page.style.setProperty("opacity", "1"), 50);
    }
    this.play();
  }

  toggleVolumeButton() {
    this.player.currentTime = 0;
    if (this.player.muted) {
      this.volumeBar.value = this.previousVolume;
      this.changeVolume();
    } else {
      this.previousVolume = this.player.volume;
      this.volumeBar.value = 0;
      this.changeVolume();
    }
  }

  changeVolume(v) {
    const value = v ? v : this.volumeBar.value;
    this.volumeBar.style.background = `linear-gradient(to right, #ffbb98 0%, #ffbb98 ${
      value * 100
    }%, rgba(52, 70, 72, 0.1) ${value * 100}%, rgba(52, 70, 72, 0.1) 100%)`;
    this.player.volume = value;
    if (this.player.volume === 0) {
      this.player.muted = true;
    } else {
      this.player.muted = false;
    }
    this.toggleVolumeIcon();
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

  play() {
    this.player.currentTime = 0;
    this.player.play();
  }

  writeSettingsData() {
    settingsData.isTimeGame = this.timeGameToggle.checked;
    settingsData.timeAmount = this.timeInput.value;
    settingsData.volume = this.player.volume;
    localStorage.setItem("settingsData", JSON.stringify(settingsData));
  }

  loadSettingsData() {
    this.timeGameToggle.checked = settingsData.isTimeGame;
    this.timeInput.value = settingsData.timeAmount;
    this.volumeBar.value = settingsData.volume;
    this.changeVolume(settingsData.volume);
  }
}
