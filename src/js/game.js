import { settingsData, artistsArray, picturesArray } from "../index";

export default class Game {
  constructor() {
    this.exitBtn = document.querySelector(".questions-btn");
    this.artistsMainBlock = document.querySelector(".questions-artists-main");
    this.artistsQuestion = document.querySelector(
      ".questions-artists-question"
    );
    this.dotList = document.querySelectorAll(".dot");
    this.artistsAnswerList = document.querySelectorAll(".artist-name");
    this.artistsAnswerBody = document.querySelector(".answers-artists-list");
    this.player = new Audio("../assets/mp3/push.mp3");
    this.categoryPage = document.querySelector(".categories");

    // popup
    this.popup = document.querySelector(".popup");
    this.popupImage = document.querySelector(".popup-img");
    this.popupPicture = document.querySelector(".popup-picture-name");
    this.popupArtist = document.querySelector(".popup-artist-name");
    this.popupBtn = document.querySelector(".popup-btn");
    this.popupContent = document.querySelector(".popup-content");
    this.popupScore = document.querySelector(".popup-score");

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
    this.player.currentTime = 0;
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
      // insert img
      const imgURL = `https://raw.githubusercontent.com/BlackBerryID/image-data/master/img/${roundData[index].imageNum}.jpg`;
      const img = new Image();
      img.src = imgURL;
      img.classList.add("questions-artists-img");
      img.onload = () => {
        // delete any images
        this.artistsRoundPage
          .querySelectorAll("img")
          .forEach((item) => item.remove());
        // regulate smooth showing
        img.style.setProperty("opacity", "0");
        this.artistsMainBlock.append(img);
        setTimeout(() => img.style.setProperty("opacity", "1"), 50);
        this.artistsAnswerBody.style.setProperty("opacity", "1");
        // write the question
        this.artistsQuestion.textContent = "Кто автор этой картины?";
        // prepare answer options
        const set = new Set();
        const correctAnswer = roundData[index]["author"];
        const correctAnswerObject = roundData[index];
        set.add(correctAnswer);
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
        this.artistsAnswerBody.addEventListener(
          "click",
          (e) => {
            this.checkAnswer.call(
              this,
              e,
              correctAnswer,
              correctAnswerObject,
              img,
              roundData,
              index
            );
          },
          { once: true }
        );
      };
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

  checkAnswer(e, correctAnswer, correctAnswerObject, img, roundData, index) {
    this.popupImage.src = img.src;
    this.popupPicture.textContent = correctAnswerObject.name;
    this.popupArtist.textContent = correctAnswerObject.author;
    if (e.target.textContent.trim() === correctAnswer) {
      this.popupContent.style.setProperty("border", "0.2rem solid lightgreen");
      this.dotList[index].style.setProperty("background-color", "#fcad85");
      this.dotList[index].style.setProperty("border-color", "#fcad85");
    } else {
      this.popupContent.style.setProperty(
        "border",
        "0.2rem solid rgb(253, 110, 110)"
      );
      this.dotList[index].style.setProperty("background-color", "#7d8e95");
    }
    this.showPopup(roundData, img, index);
  }

  showPopup(roundData, img, index) {
    this.popup.style.setProperty("visibility", "visible");
    this.popup.style.setProperty("opacity", "1");
    this.popupBtn.addEventListener(
      "click",
      () => {
        this.hidePopup.call(this, img);
        if (index === 9) {
          this.showFinalPopup.call(this);
        } else {
          this.handleRound.call(this, roundData, ++index);
        }
      },
      { once: true }
    );
  }

  hidePopup(img) {
    this.popup.style.setProperty("visibility", "hidden");
    this.popup.style.setProperty("opacity", "0");
    img.style.setProperty("opacity", "0");
    this.artistsAnswerBody.style.setProperty("opacity", "0");
    this.player.currentTime = 0;
    this.player.volume = settingsData.volume;
    this.player.play();
  }

  showFinalPopup() {
    this.popupImage.src = "../assets/png/result.png";
    this.popupPicture.textContent = "Красавчик!";
    this.popupArtist.textContent = "";
    this.popupScore.textContent = 7;
    this.popupContent.style.setProperty("border", "0.2rem solid #fcad85");
    this.popup.style.setProperty("visibility", "visible");
    this.popup.style.setProperty("opacity", "1");
    this.popupScore.classList.add("active");
    this.popupBtn.addEventListener(
      "click",
      () => {
        this.hideFinalPopup.call(this);
      },
      { once: true }
    );
  }

  hideFinalPopup() {
    this.popup.style.setProperty("visibility", "hidden");
    this.popup.style.setProperty("opacity", "0");
    this.popupScore.textContent = "";
    this.popupScore.classList.remove("active");
    this.goBack();
  }
}
