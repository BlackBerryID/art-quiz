export default class Category {
  constructor() {
    this.menuBtn = document.querySelector(".menuBtn");
    this.settingsBtn = document.querySelector(".settingsBtn");
    this.cardList = document.querySelectorAll(".card-container");
    this.monthList = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    this.categoryData = JSON.parse(localStorage.getItem("categoryData"));
  }

  show(category) {
    for (let i = 0; i < this.categoryData[category].length; i++) {
      const card = this.cardList[i];
      const title = card.querySelector(".card-title-info");
      const img = card.querySelector("img");
      const score = card.querySelector("card-title-right-answers");
      img.src = `../assets/jpg/${category}/${i + 1}.jpg`;
      console.log(title);
      title.textContent = this.monthList[i];
      if (!this.categoryData[category][i].hasScore) {
        img.style.setProperty("filter", "grayscale(1)");
      } else {
        score.textContent = this.categoryData[i].score;
      }
    }
  }
}
