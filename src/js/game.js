import {
  settingsData,
  categoriesData,
  artistsArray,
  picturesArray,
} from "../index";
import Category from "./category";
import Timer from "./timer";

export default class Game {
  constructor() {
    // general
    this.exitBtns = document.querySelectorAll(".questions-btn");
    this.dotList;
    this.player = new Audio("../assets/mp3/push.mp3");
    this.timer = new Timer();
    this.categoryPage = document.querySelector(".categories");
    this.answersArray = [];
    this.cardNum;
    this.correctAnswers;
    // artists Round
    this.artistsMainBlock = document.querySelector(".questions-artists-main");
    this.artistsQuestion = document.querySelector(
      ".questions-artists-question"
    );
    this.artistsAnswerList = document.querySelectorAll(".artist-name");
    this.artistsAnswerBody = document.querySelector(".answers-artists-list");
    this.artistsRoundPage = document.querySelector(".questions-artists");
    // pictures Round
    this.picturesMainBlock = document.querySelector(".questions-pictures-main");
    this.picturesQuestion = document.querySelector(
      ".questions-pictures-question"
    );
    this.picturesAnswerList = document.querySelectorAll(
      ".answers-pictures-img"
    );
    this.picturesRoundPage = document.querySelector(".questions-pictures");
    this.picturesAnswersItems = document.querySelectorAll(
      ".answers-pictures-item"
    );
    // popup
    this.popup = document.querySelector(".popup");
    this.popupImage = document.querySelector(".popup-img");
    this.popupPicture = document.querySelector(".popup-picture-name");
    this.popupArtist = document.querySelector(".popup-artist-name");
    this.popupBtn = document.querySelector(".popup-btn");
    this.popupContent = document.querySelector(".popup-content");
    this.popupScore = document.querySelector(".popup-score");
  }

  addEventListeners() {
    this.exitBtns.forEach((item) => {
      item.addEventListener("click", this.goBack.bind(this));
    });
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
    this.timer.clearInterval();
  }

  startRound(cardNum) {
    // clear and prepare to new round
    this.dotList =
      settingsData.activeCategory === "artists"
        ? document.querySelectorAll(".dot")
        : document.querySelectorAll(".dot-pictures");
    this.answersArray = [];
    this.cardNum = cardNum;
    this.dotList.forEach((item) => {
      item.style.setProperty("background", "transparent");
      item.style.setProperty("border-color", "#7d8e95");
    });

    // prepare data to new round
    const roundData =
      settingsData.activeCategory === "artists"
        ? artistsArray.slice(cardNum * 10, cardNum * 10 + 10)
        : picturesArray.slice(cardNum * 10, cardNum * 10 + 10);
    const roundPage = document.querySelector(
      `.questions-${settingsData.activeCategory}`
    );

    // "change" pages
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
    this.timer.start();
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
        const handler = (e) => {
          this.timer.clearInterval();
          this.checkAnswer.call(
            this,
            e,
            correctAnswer,
            correctAnswerObject,
            img,
            roundData,
            index
          );
        };
        this.artistsAnswerBody.addEventListener("click", handler, {
          once: true,
        });

        this.exitBtns.forEach(
          (item) =>
            item.addEventListener("click", () => {
              this.artistsAnswerBody.removeEventListener("click", handler, {
                once: true,
              });
            }),
          { once: true }
        );
      };
    } else if (settingsData.activeCategory === "pictures") {
      // write the question
      this.picturesQuestion.textContent = `Какую из этих картин написал ${roundData[index].author}?`;
      // prepare answer options
      let answersArray = [];
      const correctAnswerObj = roundData[index];
      answersArray.push(correctAnswerObj);
      while (answersArray.length < 4) {
        const randomNum = Math.floor(Math.random() * (119 - 0 + 1)) + 0;
        const newAnswerOptionObj = picturesArray[randomNum];
        if (
          !answersArray.find((item) => item.author == newAnswerOptionObj.author)
        ) {
          answersArray.push(newAnswerOptionObj);
        }
      }
      // shuffle answer options
      answersArray = this.shuffle([...answersArray]);
      // insert images
      for (let i = 0; i < this.picturesAnswersItems.length; i++) {
        const imgURL = `https://raw.githubusercontent.com/BlackBerryID/image-data/master/img/${answersArray[i].imageNum}.jpg`;
        const img = new Image();
        img.src = imgURL;
        img.classList.add("answers-pictures-img");
        img.onload = () => {
          // delete previous image
          this.picturesAnswersItems[i].querySelector("img").remove(),
            // regulate smooth showing
            img.style.setProperty("opacity", "0");
          this.picturesAnswersItems[i].append(img);
          setTimeout(() => img.style.setProperty("opacity", "1"), 50);
        };
      }
      const handler = (e) => {
        this.timer.clearInterval();
        const regEx = new RegExp(correctAnswerObj.imageNum);
        const isCorrect = regEx.test(e.target.src);
        this.checkAnswer.call(
          this,
          e,
          isCorrect,
          correctAnswerObj,
          `https://raw.githubusercontent.com/BlackBerryID/image-data/master/img/${correctAnswerObj.imageNum}.jpg`,
          roundData,
          index
        );
      };
      this.picturesMainBlock.addEventListener("click", handler, { once: true });
      this.exitBtns.forEach(
        (item) =>
          item.addEventListener("click", () => {
            this.picturesMainBlock.removeEventListener("click", handler, {
              once: true,
            });
          }),
        { once: true }
      );
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
    this.popupImage.src = typeof img === "string" ? img : img.src;
    this.popupPicture.textContent = correctAnswerObject.name;
    this.popupArtist.textContent = correctAnswerObject.author;
    console.count("checkAnswer");
    if (
      e.target.textContent.trim() === correctAnswer ||
      correctAnswer === true
    ) {
      this.popupContent.style.setProperty("border", "0.2rem solid lightgreen");
      this.dotList[index].style.setProperty("background-color", "#fcad85");
      this.dotList[index].style.setProperty("border-color", "#fcad85");
      this.answersArray.push(true);
      this.player.src = "../assets/mp3/trueAnswer.mp3";
      this.player.volume = settingsData.volume;
      this.player.play();
    } else {
      this.popupContent.style.setProperty(
        "border",
        "0.2rem solid rgb(253, 110, 110)"
      );
      this.dotList[index].style.setProperty("background-color", "#7d8e95");
      this.answersArray.push(false);
      this.player.src = "../assets/mp3/falseAnswer.mp3";
      this.player.volume = settingsData.volume;
      this.player.play();
    }
    if (typeof img === "string") img = false;
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
    if (img) img.style.setProperty("opacity", "0");
    this.artistsAnswerBody.style.setProperty("opacity", "0");
  }

  showFinalPopup() {
    this.popupImage.src = "../assets/png/result.png";
    let result;
    this.popupArtist.textContent = "";
    this.correctAnswers = this.answersArray.filter((item) => item).length;
    switch (this.correctAnswers) {
      case 10:
        result = "Вы Мастер!";
        break;
      case 9:
        result = "Отличный результат!";
        break;
      case 8:
        result = "Замечательный результат!";
        break;
      case 7:
      case 6:
        result = "Хороший результат!";
        break;
      case 5:
      case 4:
        result = "Неплохо, вы на верном пути!";
        break;
      case 3:
      case 2:
        result = "Вы можете лучше, продолжайте!";
        break;
      case 1:
      case 0:
        result = "Попробуйте ещё раз.";
        break;
    }
    this.popupPicture.textContent = result;
    this.popupScore.textContent =
      this.correctAnswers === 10 ? "M" : this.correctAnswers;
    this.popupContent.style.setProperty("border", "0.2rem solid #fcad85");
    this.popup.style.setProperty("visibility", "visible");
    this.popup.style.setProperty("opacity", "1");
    this.popupScore.classList.add("active");
    this.player.src = "../assets/mp3/roundEnd.mp3";
    this.player.volume = settingsData.volume;
    this.player.play();
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
    this.player.src = "../assets/mp3/push.mp3";
    this.writeAnswersData();
    this.goBack();
  }

  writeAnswersData() {
    const currentCategory = settingsData.activeCategory;
    categoriesData[currentCategory][this.cardNum] = {
      hasScore: true,
      pictures: this.answersArray,
      score: this.correctAnswers,
    };
    localStorage.setItem("categoriesData", JSON.stringify(categoriesData));
    const categoryClass = new Category();
    categoryClass.show(settingsData.activeCategory);
  }
}
