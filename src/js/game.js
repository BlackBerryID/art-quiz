import { settingsData, artistsArray, picturesArray } from "../index";

export default class Game {
  constructor() {
    this.exitBtn = document.querySelector(".questions-btn");
    this.artistsMainBlock = document.querySelector(".questions-artists-main");
    this.artistsQuestion = document.querySelector(
      ".questions-artists-question"
    );
    this.dotList = document.querySelectorAll(".dot");
    // this.artistsImage = document.querySelector(".questions-artists-img");
    this.artistsAnswerList = document.querySelectorAll(".artist-name");
    this.player = new Audio("../assets/mp3/push.mp3");
    this.categoryPage = document.querySelector(".categories");
    this.artistsRoundPage = document.querySelector(".questions-artists");
    this.picturesRoundPage;

    this.exitBtn.addEventListener("click", this.goBack.bind(this));
  }

  goBack() {
    const currentPage =
      settingsData.activeCategory === "artists"
        ? this.artistsRoundPage
        : this.picturesRoundPage;
    currentPage.style.setProperty("pointer-events", "none");
    currentPage.style.setProperty("opacity", "0");
    setTimeout(showSettingsPage.bind(this), 200);
    function showSettingsPage() {
      currentPage.style.setProperty("display", "none");
      currentPage.style.setProperty("pointer-events", "initial");
      this.categoryPage.style.setProperty("display", "block");
      setTimeout(() => this.categoryPage.style.setProperty("opacity", "1"), 50);
    }
    this.player.volume = settingsData.volume;
    this.player.play();
  }

  startRound(cardNum) {
    const roundData =
      settingsData.activeCategory === "artists"
        ? artistsArray.slice(cardNum * 10, cardNum * 10 + 10)
        : picturesArray.slice(cardNum * 10, cardNum * 10 + 10);
    const roundPage = document.querySelector(
      `.questions-${settingsData.activeCategory}`
    );

    this.categoryPage.style.setProperty("pointer-events", "none");
    this.categoryPage.style.setProperty("opacity", "0");
    setTimeout(showSettingsPage.bind(this), 200);
    function showSettingsPage() {
      this.categoryPage.style.setProperty("display", "none");
      this.categoryPage.style.setProperty("pointer-events", "initial");
      roundPage.style.setProperty("display", "block");
      setTimeout(() => roundPage.style.setProperty("opacity", "1"), 50);
    }
    this.player.volume = settingsData.volume;
    this.player.play();

    this.handleRound(roundData, 0);
  }

  handleRound(roundData, index) {
    // define category
    if (settingsData.activeCategory === "artists") {
      // delete any images
      this.artistsRoundPage
        .querySelectorAll("img")
        .forEach((item) => item.remove());
      // write the question
      this.artistsQuestion.textContent = "Кто автор этой картины?";
      // insert img
      const imgURL = `https://raw.githubusercontent.com/BlackBerryID/image-data/master/img/${roundData[index].imageNum}.jpg`;
      const img = new Image();
      img.src = imgURL;
      img.classList.add("questions-artists-img");
      img.onload = () => {
        this.artistsMainBlock.append(img);
      };
      // prepare answer options
      let set = new Set();
      set.add(roundData[index]["author"]);
      while (set.size < 4) {
        const randomNum = Math.floor(Math.random() * (119 - 0 + 1)) + 0;
        set.add(artistsArray[randomNum].author);
      }
      // shuffle answer options
      const answersArray = this.shuffle([...set]);
      // insert answer options
      Array.from(this.artistsAnswerList).map(
        (item) => (item.textContent = answersArray.pop())
      );
    } else if (settingsData.activeCategory === "pictures") {
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
