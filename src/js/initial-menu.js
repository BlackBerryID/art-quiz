export default class Menu {
  constructor() {
    this.artistsGameBtn = document.querySelector(".category-selection-artists");
    this.picturesGameBtn = document.querySelector(
      ".category-selection-pictures"
    );
    this.settingsBtn = document.querySelector(".settings-btn");
    this.settingsPage = document.querySelector(".settings");
    this.initialMenu = document.querySelector(".initial");
    this.category = document.querySelector(".categories");
  }

  openCategory() {
    this.initialMenu.style.setProperty("pointer-events", "none");
    this.initialMenu.style.setProperty("opacity", "0");
    setTimeout(showCategoryPage.bind(this), 200);
    function showCategoryPage() {
      this.initialMenu.style.setProperty("display", "none");
      this.initialMenu.style.setProperty("pointer-events", "initial");
      this.category.style.setProperty("display", "block");
      setTimeout(() => this.category.style.setProperty("opacity", "1"), 50);
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
  }
}
