import { settingsData } from "../index";

let countdown;

export default class Timer {
  constructor() {
    this.timerPanelList = document.querySelectorAll(".timer");
    this.currentTimerPanel;
    this.artistsAnswerBody = document.querySelector(".answers-artists-list");
    this.picturesMainBlock = document.querySelector(".questions-pictures-main");
  }

  start() {
    if (!settingsData.isTimeGame) return;
    this.currentTimerPanel =
      settingsData.activeCategory === "artists"
        ? this.timerPanelList[0]
        : this.timerPanelList[1];
    let timeAmount = settingsData.timeAmount;
    this.currentTimerPanel.textContent = timeAmount;
    countdown = setInterval(() => {
      timeAmount--;
      if (timeAmount === -1) {
        clearInterval(countdown);
        const event = new Event("click");
        settingsData.activeCategory === "artists"
          ? this.artistsAnswerBody.dispatchEvent(event)
          : this.picturesMainBlock.dispatchEvent(event);
        return;
      }
      this.currentTimerPanel.textContent = timeAmount;
    }, 1000);
  }

  clearInterval() {
    clearInterval(countdown);
  }
}
