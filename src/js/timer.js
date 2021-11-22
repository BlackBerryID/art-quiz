import { settingsData } from "../index";

let countdown;

export default class Timer {
  constructor() {
    this.timerPanel = document.querySelector(".timer");
  }

  start() {
    console.log("works");
    if (!settingsData.isTimeGame) return;
    let timeAmount = settingsData.timeAmount;
    this.timerPanel.textContent = timeAmount;
    countdown = setInterval(() => {
      timeAmount--;
      if (timeAmount === -1) {
        clearInterval(this.countdown);
        handler(null);
      }
      this.timerPanel.textContent = timeAmount;
    }, 1000);
  }

  clearInterval() {
    clearInterval(countdown);
    this.timerPanel.textContent = "";
  }
}
