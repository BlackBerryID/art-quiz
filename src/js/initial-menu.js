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
      item.addEventListener("click", (e) => this.openCategory(e))
    );
  }

  openCategory(e) {
    const targetCategory = e.path[1].classList.contains("artists")
      ? "artists"
      : "pictures";
    this.animateOpening(targetCategory);
    this.initialMenu.style.setProperty("pointer-events", "none");
    setTimeout(() => {
      this.initialMenu.style.setProperty("opacity", "0");
      setTimeout(showCategoryPage.bind(this), 200);
      function showCategoryPage() {
        this.initialMenu.style.setProperty("display", "none");
        this.initialMenu.style.setProperty("pointer-events", "initial");
        this.categoryPage.style.setProperty("display", "block");
        this.restoreMenuAppearance(targetCategory);
        setTimeout(
          () => this.categoryPage.style.setProperty("opacity", "1"),
          50
        );
      }
      this.player.volume = settingsData.volume;
      this.player.play();
      if (targetCategory === "artists") {
        settingsData.activeCategory = "artists";
        this.category.show("artists");
      } else if (targetCategory === "pictures") {
        settingsData.activeCategory = "pictures";
        this.category.show("pictures");
      }
    }, 1000);
  }

  animateOpening(category) {
    if (category === "artists") {
      this.artistsGameBtn.style.setProperty("transform", "translateY(50%)");
      this.picturesGameBtn.style.setProperty("transform", "scale(0.1)");
      this.picturesGameBtn.style.setProperty("opacity", "0");
    } else if (category === "pictures") {
      this.picturesGameBtn.style.setProperty("transform", "translateY(-50%)");
      this.artistsGameBtn.style.setProperty("transform", "scale(0.1)");
      this.artistsGameBtn.style.setProperty("opacity", "0");
    }
  }

  restoreMenuAppearance(category) {
    if (category === "artists") {
      this.artistsGameBtn.style.setProperty("transform", "translateY(0)");
      this.picturesGameBtn.style.setProperty("transform", "scale(1)");
      this.picturesGameBtn.style.setProperty("opacity", "1");
    } else if (category === "pictures") {
      this.picturesGameBtn.style.setProperty("transform", "translateY(0)");
      this.artistsGameBtn.style.setProperty("transform", "scale(1)");
      this.artistsGameBtn.style.setProperty("opacity", "1");
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
