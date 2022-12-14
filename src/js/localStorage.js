export default class Storage {
  initCategoryData() {
    if (!localStorage.getItem('categoriesData')) {
      const propertyTemplate = Array(12).fill({
        hasScore: false,
        score: 0,
        pictures: Array(12).fill(false),
      });
      const categoryData = {
        artists: propertyTemplate,
        pictures: propertyTemplate,
      };
      localStorage.setItem('categoriesData', JSON.stringify(categoryData));
    }
  }

  initSettingsData() {
    if (!localStorage.getItem('settingsData')) {
      const settingsData = {
        isTimeGame: false,
        timeAmount: 20,
        volume: 0,
      };
      localStorage.setItem('settingsData', JSON.stringify(settingsData));
    }
  }

  getSettingData() {
    return JSON.parse(localStorage.getItem('settingsData'));
  }

  getCategoriesData() {
    return JSON.parse(localStorage.getItem('categoriesData'));
  }
}
