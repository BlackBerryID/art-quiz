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
    this.categoryPage.classList.add('untouchable')
    const targetButton = this.cardList[cardNum].querySelector(".card-score");
    targetButton.classList.add("animate");
    setTimeout(() => {
      this.categoryPage.classList.add('hide')
      const scoreData =
        categoriesData[settingsData.activeCategory][cardNum].pictures;
      let currentArrayData =
        settingsData.activeCategory === "artists"
          ? artistsArray
          : picturesArray;
      currentArrayData = currentArrayData.slice(
        cardNum * 10,
        cardNum * 10 + 10
      );
      scoreData.forEach((item, index) => {
        const card = this.cardList[index];
        this.updateCardDescription(card, currentArrayData, index);
        const title = card.querySelector(".card-title-info");
        const img = card.querySelector("img");
        const score = card.querySelector(".card-title-right-answers");
        title.textContent = settingsData.monthList[cardNum];
        score.textContent = "";

        const newImgURL = `https://raw.githubusercontent.com/BlackBerryID/image-data/master/img/${currentArrayData[index].imageNum}.jpg`;
        const newImg = new Image();
        newImg.src = newImgURL;
        newImg.classList.add("card-img");
        newImg.onload = () => {
          img.replaceWith(newImg);
        };

        if (item) {
          newImg.classList.remove('gray')
        } else {
          newImg.classList.add('gray')
        }
      })
      setTimeout(() => this.showScore(targetButton), 200);
      this.updateScorePage();
    }, 1000);
    this.player.volume = settingsData.volume;
    this.player.play();
  }

  showScore(targetButton) {
    targetButton.classList.remove("animate");
    this.categoryPage.classList.add('remove')
    targetButton.classList.add('remove')
    window.scrollTo(0, 0);
    this.categoryBtn.textContent = "Категории";
    this.categoryPage.classList.remove('untouchable')
    this.categoryPage.classList.remove('remove')
    setTimeout(() => {
      this.categoryPage.classList.remove('hide')
        targetButton.classList.remove('remove')
    }, 50);
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
    this.categoryPage.classList.add('untouchable')
    this.categoryPage.classList.add('hide')
    this.player.volume = settingsData.volume;
    this.player.play();
    setTimeout(() => this.showCategoryPage(categoryClass), 200);
    this.updateScorePage();
  }

  showCategoryPage(categoryClass) {
    categoryClass.show(settingsData.activeCategory);
    this.categoryBtn.textContent = "Настройки";
    this.categoryPage.classList.remove('untouchable')
    this.categoryPage.classList.remove('hide')
  }

  updateScorePage(flag) {
    if (settingsData.isScoreOpen) {
      settingsData.isScoreOpen = false;
      [this.cardList[10], this.cardList[11]].map((item) => {
        item.classList.remove('hide')
          setTimeout(() => item.classList.remove('remove'), 200);
      });
      Array.from(this.cardList).map((item) => {
        item.querySelector(".card-score").classList.remove("active");
        setTimeout(() => {
          item.querySelector(".card-info").classList.add('hide'),
            item.querySelector(".card-info").classList.remove("active-info");
        }, 200);
        setTimeout(
          () =>
            item.querySelector(".card-info").classList.remove('hide'),
          1000
        );
      });
      setTimeout(() => (this.categoryBtn.textContent = "Настройки"), 200);
    } else if (!settingsData.isScoreOpen && !flag) {
      settingsData.isScoreOpen = true;
      [this.cardList[10], this.cardList[11]].map((item) => {
        item.classList.add('hide'),
          setTimeout(() => item.classList.add('remove'), 200);
      });
      Array.from(this.cardList).map((item) => {
        item.querySelector(".card-score").classList.add("active");
      });
    }
  }
}
