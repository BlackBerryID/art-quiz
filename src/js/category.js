import { settingsData, categoriesData } from "../index";
import Game from "../js/game";
import Score from "./score";

export default class Category {
  static monthList

  constructor() {
    this.menuBtn = document.querySelector(".menuBtn");
    this.settingsBtn = document.querySelector(".settingsBtn");
    this.cardsContainer = document.querySelector('.card-list')
    this.cardList = document.querySelectorAll(".card-container");
    this.initialMenu = document.querySelector(".initial");
    this.categoryPage = document.querySelector(".categories");
    this.settingsPage = document.querySelector(".settings");
    this.scoreBtnList = document.querySelectorAll(".card-score");
    this.game = new Game();
    this.score = new Score();
    Category.monthList = [
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
    settingsData.monthList = Category.monthList;
    this.player = new Audio("../assets/mp3/push.mp3");
  }

  addEventListeners() {
    this.menuBtn.addEventListener("click", () => this.openMenu());
    this.settingsBtn.addEventListener("click", () => this.openSettings());
    this.cardsContainer.addEventListener('click', (e) => this.cardListClicksHandler(e))
  }

  cardListClicksHandler(e) {
    if (e.target.classList.contains("card-list")) {
      console.log('container')
      return
    } else if (e.target.classList.contains("card-score")) {
      this.score.openScore(Array.from(this.scoreBtnList).indexOf(e.target))
    } else {
      const card = e.target.parentElement.classList.contains('card-item') 
                   ? e.target.parentElement 
                   : e.target.parentElement.parentElement;
      if (settingsData.isScoreOpen) {
        card
          .querySelector(".card-info")
          .classList.toggle("active-info");
        return;
      }
      this.game.startRound(Array.from(this.cardList).indexOf(card.parentElement));
    }
    
  }

  show(category) {
    categoriesData[category].forEach((item, index) => {
      const card = this.cardList[index];
      const title = card.querySelector(".card-title-info");
      const img = card.querySelector("img");
      const score = card.querySelector(".card-title-right-answers");
      img.src = `../assets/jpg/${category}/${index + 1}.jpg`;
      title.textContent = Category.monthList[index];
      if (!item.hasScore) {
        img.style.setProperty("filter", "grayscale(1)");
        score.textContent = "";
        this.scoreBtnList[index].classList.add("active");
      } else {
        img.style.setProperty("filter", "grayscale(0)");
        score.textContent = item.score;
        this.scoreBtnList[index].classList.remove("active");
      }
    })
  }

  openMenu() {
    this.score.updateScorePage(true);
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
