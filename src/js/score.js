import {
  categoriesData,
  settingsData,
  artistsArray,
  picturesArray,
} from "../index";
import Category from "./category";

export default class Score {
  constructor() {
    this.menuBtn = document.querySelector(".menuBtn");
    this.categoryBtn = document.querySelector(".settingsBtn");
    this.cardList = document.querySelectorAll(".card-container");
    this.initialMenu = document.querySelector(".initial");
    this.categoryPage = document.querySelector(".categories");
    this.player = new Audio("../assets/mp3/push.mp3");
  }

  openScore(cardNum) {
    this.categoryPage.style.setProperty("pointer-events", "none");
    this.categoryPage.style.setProperty("opacity", "0");
    const scoreData =
      categoriesData[settingsData.activeCategory][cardNum].pictures;
    let currentArrayData =
      settingsData.activeCategory === "artists" ? artistsArray : picturesArray;
    currentArrayData = currentArrayData.slice(cardNum * 10, cardNum * 10 + 10);
    for (let i = 0; i < scoreData.length; i++) {
      const card = this.cardList[i];
      this.updateCardDescription(card, currentArrayData, i);
      const title = card.querySelector(".card-title-info");
      const img = card.querySelector("img");
      const score = card.querySelector(".card-title-right-answers");
      title.textContent = settingsData.monthList[cardNum];
      score.textContent = "";

      const newImgURL = `https://raw.githubusercontent.com/BlackBerryID/image-data/master/img/${currentArrayData[i].imageNum}.jpg`;
      const newImg = new Image();
      newImg.src = newImgURL;
      newImg.classList.add("card-img");
      newImg.onload = () => {
        img.replaceWith(newImg);
      };

      if (scoreData[i]) {
        newImg.style.setProperty("filter", "grayscale(0)");
      } else {
        newImg.style.setProperty("filter", "grayscale(1)");
      }
    }
    setTimeout(showScore.bind(this), 200);
    function showScore() {
      this.categoryPage.style.setProperty("display", "none");
      window.scrollTo(0, 0);
      this.categoryBtn.textContent = "Категории";
      this.categoryPage.style.setProperty("pointer-events", "initial");
      this.categoryPage.style.setProperty("display", "block");
      setTimeout(() => this.categoryPage.style.setProperty("opacity", "1"), 50);
    }
    this.player.volume = settingsData.volume;
    this.player.play();
    this.updateScorePage();
  }

  updateCardDescription(card, currentArrayData, index) {
    const pictureName = card.querySelector(".picture-name");
    const pictureAuthor = card.querySelector(".picture-author");
    const pictureYear = card.querySelector(".picture-year");
    pictureName.textContent = currentArrayData[index].name;
    pictureAuthor.textContent = currentArrayData[index].author;
    pictureYear.textContent = currentArrayData[index].year;
  }

  openCategory() {
    const categoryClass = new Category();
    this.categoryPage.style.setProperty("pointer-events", "none");
    this.categoryPage.style.setProperty("opacity", "0");
    this.player.volume = settingsData.volume;
    this.player.play();
    setTimeout(showCategoryPage.bind(this), 200);
    function showCategoryPage() {
      categoryClass.show(settingsData.activeCategory);
      this.categoryBtn.textContent = "Настройки";
      this.categoryPage.style.setProperty("pointer-events", "initial");
      this.categoryPage.style.setProperty("opacity", "1");
    }
    this.updateScorePage();
  }

  updateScorePage(flag) {
    if (settingsData.isScoreOpen) {
      settingsData.isScoreOpen = false;
      [this.cardList[10], this.cardList[11]].map((item) => {
        item.style.setProperty("opacity", 1),
          setTimeout(() => item.style.setProperty("display", "block"), 200);
      });
      Array.from(this.cardList).map((item) => {
        item.querySelector(".card-score").classList.remove("active");
        setTimeout(() => {
          item.querySelector(".card-info").style.setProperty("opacity", "0"),
            item.querySelector(".card-info").classList.remove("active-info");
        }, 200);
        setTimeout(
          () =>
            item.querySelector(".card-info").style.setProperty("opacity", "1"),
          1000
        );
      });
      setTimeout(() => (this.categoryBtn.textContent = "Настройки"), 200);
    } else if (!settingsData.isScoreOpen && !flag) {
      settingsData.isScoreOpen = true;
      [this.cardList[10], this.cardList[11]].map((item) => {
        item.style.setProperty("opacity", 0),
          setTimeout(() => item.style.setProperty("display", "none"), 200);
      });
      Array.from(this.cardList).map((item) => {
        item.querySelector(".card-score").classList.add("active");
      });
    }
  }
}
