import { settingsData, categoriesData } from "../index";
import Game from "../js/game";
import Score from "./score";

export default class Category {
  constructor() {
    this.menuBtn = document.querySelector(".menuBtn");
    this.settingsBtn = document.querySelector(".settingsBtn");
    this.cardList = document.querySelectorAll(".card-container");
    this.initialMenu = document.querySelector(".initial");
    this.categoryPage = document.querySelector(".categories");
    this.settingsPage = document.querySelector(".settings");
    this.scoreBtnList = document.querySelectorAll(".card-score");
    this.game = new Game();
    this.score = new Score();
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
    settingsData.monthList = this.monthList;
    this.player = new Audio("../assets/mp3/push.mp3");
  }

  addEventListeners() {
    this.menuBtn.addEventListener("click", this.openMenu.bind(this));
    this.settingsBtn.addEventListener("click", this.openSettings.bind(this));
    this.cardList.forEach((item) =>
      item.addEventListener("click", (e) => {
        if (e.target.classList.contains("card-score")) return;
        if (settingsData.isScoreOpen) {
          e.currentTarget
            .querySelector(".card-info")
            .classList.toggle("active-info");
          return;
        }
        this.game.startRound.call(
          this.game,
          Array.from(this.cardList).indexOf(item)
        );
      })
    );
    this.scoreBtnList.forEach((item) =>
      item.addEventListener(
        "click",
        this.score.openScore.bind(
          this.score,
          Array.from(this.scoreBtnList).indexOf(item)
        )
      )
    );
  }

  show(category) {
    for (let i = 0; i < categoriesData[category].length; i++) {
      const card = this.cardList[i];
      const title = card.querySelector(".card-title-info");
      const img = card.querySelector("img");
      const score = card.querySelector(".card-title-right-answers");
      img.src = `../assets/jpg/${category}/${i + 1}.jpg`;
      title.textContent = this.monthList[i];
      if (!categoriesData[category][i].hasScore) {
        img.style.setProperty("filter", "grayscale(1)");
        score.textContent = "";
      } else {
        img.style.setProperty("filter", "grayscale(0)");
        score.textContent = categoriesData[category][i].score;
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
    if (settingsData.isScoreOpen) {
      this.score.openCategory();
      return;
    }
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
