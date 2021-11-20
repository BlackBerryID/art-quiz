export default class Storage {
  initCategoryData() {
    if (!localStorage.getItem("category")) {
      let categoryData = {};
      categoryData.artists = categoryData.pictures = Array(12).fill({
        hasScore: false,
        score: 0,
        pictures: Array(12).fill(false),
      });
      localStorage.setItem("categoryData", JSON.stringify(categoryData));
    }
  }

  initSettingsData() {
    if (!localStorage.getItem("settingsData")) {
      const settingsData = {
        isTimeGame: false,
        timeAmount: 20,
        volume: 0,
      };
      localStorage.setItem("settingsData", JSON.stringify(settingsData));
    }
  }

  grabSettingData() {
    return {
      isTimeGame: JSON.parse(localStorage.getItem("settingsData")).isTimeGame,
      timeAmount: JSON.parse(localStorage.getItem("settingsData")).timeAmount,
      volume: JSON.parse(localStorage.getItem("settingsData")).volume,
    };
  }
}
