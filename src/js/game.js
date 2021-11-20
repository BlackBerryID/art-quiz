import { settingsData, artistsArray, picturesArray } from "../index";

export default class Game {
  constructor() {
    this.exitBtn = document.querySelector(".questions-btn");
    this.artistsQuestion = document.querySelector(
      ".questions-artists-question"
    );
    this.dotList = document.querySelectorAll(".dot");
    this.artistsImage = document.querySelector(".questions-artists-img");
    this.artistsAnswerList = document.querySelectorAll(".artist-name");
  }
}
