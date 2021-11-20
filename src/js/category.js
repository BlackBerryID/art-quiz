import { settingsData } from "../index";
import Game from "../js/game";

export default class Category {
  constructor() {
    this.menuBtn = document.querySelector(".menuBtn");
    this.settingsBtn = document.querySelector(".settingsBtn");
    this.cardList = document.querySelectorAll(".card-container");
    this.initialMenu = document.querySelector(".initial");
    this.categoryPage = document.querySelector(".categories");
    this.settingsPage = document.querySelector(".settings");
    this.game = new Game();
    this.monthList = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    this.categoryData = JSON.parse(localStorage.getItem("categoryData"));
    this.player = new Audio("../assets/mp3/push.mp3");

    this.menuBtn.addEventListener("click", this.openMenu.bind(this));
    this.settingsBtn.addEventListener("click", this.openSettings.bind(this));
    this.cardList.forEach((item) =>
      item.addEventListener(
        "click",
        this.game.startRound.bind(
          this.game,
          Array.from(this.cardList).indexOf(item)
        )
      )
    );
  }

  show(category) {
    for (let i = 0; i < this.categoryData[category].length; i++) {
      const card = this.cardList[i];
      const title = card.querySelector(".card-title-info");
      const img = card.querySelector("img");
      const score = card.querySelector("card-title-right-answers");
      img.src = `../assets/jpg/${category}/${i + 1}.jpg`;
      title.textContent = this.monthList[i];
      if (!this.categoryData[category][i].hasScore) {
        img.style.setProperty("filter", "grayscale(1)");
      } else {
        score.textContent = this.categoryData[i].score;
      }
    }
  }

  openMenu() {
    this.categoryPage.style.setProperty("pointer-events", "none");
    this.categoryPage.style.setProperty("opacity", "0");
    setTimeout(showMenu.bind(this), 200);
    function showMenu() {
      this.categoryPage.style.setProperty("display", "none");
      this.categoryPage.style.setProperty("pointer-events", "initial");
      this.initialMenu.style.setProperty("display", "block");
      setTimeout(() => this.initialMenu.style.setProperty("opacity", "1"), 50);
    }
    this.player.volume = settingsData.volume;
    this.player.play();
  }

  openSettings() {
    this.categoryPage.style.setProperty("pointer-events", "none");
    this.categoryPage.style.setProperty("opacity", "0");
    setTimeout(showMenu.bind(this), 200);
    function showMenu() {
      this.categoryPage.style.setProperty("display", "none");
      this.categoryPage.style.setProperty("pointer-events", "initial");
      this.settingsPage.style.setProperty("display", "block");
      setTimeout(() => this.settingsPage.style.setProperty("opacity", "1"), 50);
    }
    settingsData.prevPage = "category";
    this.player.volume = settingsData.volume;
    this.player.play();
  }
}
