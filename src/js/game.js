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
      item.addEventListener("click", () => this.goBack());
    });
  }

  goBack() {
    const currentPage =
      settingsData.activeCategory === "artists"
        ? this.artistsRoundPage
        : this.picturesRoundPage;
    currentPage.classList.add('untouchable')
    currentPage.classList.add('hide')
    setTimeout(() => this.showSettingsPage(currentPage, 'back'), 200);
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
      item.classList.remove('dot-right-answer', 'dot-wrong-answer')
    });

    // prepare data to new round
    const cardsPerGameRound = 10;
    const positionOfFirstCard = cardNum * cardsPerGameRound;
    const roundData =
      settingsData.activeCategory === "artists"
        ? artistsArray.slice(positionOfFirstCard, positionOfFirstCard + cardsPerGameRound)
        : picturesArray.slice(positionOfFirstCard, positionOfFirstCard + cardsPerGameRound);
    const roundPage = document.querySelector(
      `.questions-${settingsData.activeCategory}`
    );

    // "change" pages
    this.categoryPage.classList.add('untouchable')
    this.categoryPage.classList.add('hide')
    setTimeout(() => this.showSettingsPage(roundPage, 'start'), 200);
    this.player.src = "../assets/mp3/push.mp3";
    this.player.volume = settingsData.volume;
    this.player.play();

    this.handleRound(roundData, 0);
  }

  showSettingsPage(page, action) {
    const pageForHide = (action === 'start' ? this.categoryPage : page);
    const pageForShow = (action === 'start' ? page : this.categoryPage);
    pageForHide.classList.add('remove')
    pageForHide.classList.remove('untouchable')
    pageForShow.classList.remove('remove')
    setTimeout(() => pageForShow.classList.remove('hide'), 50);
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
        img.classList.add('hide');
        this.artistsMainBlock.append(img);
        setTimeout(() => img.classList.remove('hide'), 50);
        this.artistsAnswerBody.classList.remove('hide');
        // write the question
        this.artistsQuestion.textContent = "Кто автор этой картины?";
        // prepare answer options
        const answersCollection = new Set();
        const correctAnswer = roundData[index]["author"];
        const correctAnswerObject = roundData[index];
        answersCollection.add(correctAnswer);
        function addRandomAnswers() {
          const firstIndexOfDataArray = 0;
          const lastIndexOfDataArray = artistsArray.length - 1;

          while (answersCollection.size < 4) {
            const randomNum = Math.floor(Math.random() * (lastIndexOfDataArray - (firstIndexOfDataArray + 1))) + firstIndexOfDataArray;
            answersCollection.add(artistsArray[randomNum].author);
          }
        }
        addRandomAnswers()
        // shuffle answer options
        const answersArray = this.shuffle([...answersCollection]);
        // insert answer options
        Array.from(this.artistsAnswerList).map(
          (item) => (item.textContent = answersArray.pop())
        );
        const handler = (e) => {
          this.timer.clearInterval();
          this.checkAnswer(
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
      this.picturesAnswersItems.forEach((item, index) => {
        const imgURL = `https://raw.githubusercontent.com/BlackBerryID/image-data/master/img/${answersArray[index].imageNum}.jpg`;
        const img = new Image();
        img.src = imgURL;
        img.classList.add("answers-pictures-img");
        img.onload = () => {
          // delete previous image
          item.querySelector("img").remove(),
            // regulate smooth showing
            img.classList.add('hide')
            item.append(img);
          setTimeout(() => img.classList.remove('hide'), 50);
        };
      })
      const handler = (e) => {
        this.timer.clearInterval();
        const regEx = new RegExp(correctAnswerObj.imageNum);
        const isCorrect = regEx.test(e.target.src);
        this.checkAnswer(
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
    if (
      e.target.textContent.trim() === correctAnswer ||
      correctAnswer === true
    ) {
      this.popupContent.classList.remove('popup-wrong-answer')
      this.popupContent.classList.add('popup-right-answer')
      this.dotList[index].classList.add('dot-right-answer')
      this.answersArray.push(true);
      this.player.src = "../assets/mp3/trueAnswer.mp3";
      this.player.volume = settingsData.volume;
      this.player.play();
    } else {
      this.popupContent.classList.remove('popup-right-answer')
      this.popupContent.classList.add('popup-wrong-answer')
      this.dotList[index].classList.add('dot-wrong-answer')
      this.answersArray.push(false);
      this.player.src = "../assets/mp3/falseAnswer.mp3";
      this.player.volume = settingsData.volume;
      this.player.play();
    }
    if (typeof img === "string") img = false;
    this.showPopup(roundData, img, index);
  }

  showPopup(roundData, img, index) {
    this.popup.classList.remove('hidden')
    this.popup.classList.remove('hide')
    this.popupBtn.addEventListener(
      "click",
      () => {
        this.hidePopup(img);
        if (index === 9) {
          this.showFinalPopup();
        } else {
          this.handleRound(roundData, ++index);
        }
      },
      { once: true }
    );
  }

  hidePopup(img) {
    this.popup.classList.add('hidden')
    this.popup.classList.add('hide')
    if (img) img.classList.remove('hide')
    this.artistsAnswerBody.classList.remove('hide')
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
    this.popupContent.classList.add('final-popup')
    this.popup.classList.remove('hidden')
    this.popup.classList.remove('hide')
    this.popupScore.classList.add("active");
    this.player.src = "../assets/mp3/roundEnd.mp3";
    this.player.volume = settingsData.volume;
    this.player.play();
    this.popupBtn.addEventListener(
      "click",
      () => {
        this.hideFinalPopup();
      },
      { once: true }
    );
  }

  hideFinalPopup() {
    this.popup.classList.add('hidden')
    this.popup.classList.add('hide')
    this.popup.classList.remove('final-popup')
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
