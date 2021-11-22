import { settingsData } from "../index";
import Category from "./category";

export default class Menu {
  constructor() {
    this.artistsGameBtn = document.querySelector(".category-selection-artists");
    this.picturesGameBtn = document.querySelector(
      ".category-selection-pictures"
    );
    this.settingsBtn = document.querySelector(".settings-btn");
    this.settingsPage = document.querySelector(".settings");
    this.initialMenu = document.querySelector(".initial");
    this.categoryPage = document.querySelector(".categories");
    this.player = new Audio("../assets/mp3/push.mp3");
    this.category = new Category();
  }

  addEventListeners() {
    this.settingsBtn.addEventListener("click", this.openSettings.bind(this));
    [this.artistsGameBtn, this.picturesGameBtn].forEach((item) =>
      item.addEventListener("click", (e) => this.openCategory.call(this, e))
    );
  }

  openCategory(e) {
    this.initialMenu.style.setProperty("pointer-events", "none");
    this.initialMenu.style.setProperty("opacity", "0");
    setTimeout(showCategoryPage.bind(this), 200);
    function showCategoryPage() {
      this.initialMenu.style.setProperty("display", "none");
      this.initialMenu.style.setProperty("pointer-events", "initial");
      this.categoryPage.style.setProperty("display", "block");
      setTimeout(() => this.categoryPage.style.setProperty("opacity", "1"), 50);
    }
    this.player.volume = settingsData.volume;
    this.player.play();
    if (e.path[1].classList.contains("artists")) {
      settingsData.activeCategory = "artists";
      this.category.show("artists");
    } else if (e.path[1].classList.contains("pictures")) {
      settingsData.activeCategory = "pictures";
      this.category.show("pictures");
    }
  }

  openSettings() {
    this.initialMenu.style.setProperty("pointer-events", "none");
    this.initialMenu.style.setProperty("opacity", "0");
    setTimeout(showSettingsPage.bind(this), 200);
    function showSettingsPage() {
      this.initialMenu.style.setProperty("display", "none");
      this.initialMenu.style.setProperty("pointer-events", "initial");
      this.settingsPage.style.setProperty("display", "block");
      setTimeout(() => this.settingsPage.style.setProperty("opacity", "1"), 50);
    }
    settingsData.prevPage = "menu";
    this.player.volume = settingsData.volume;
    this.player.play();
  }
}
