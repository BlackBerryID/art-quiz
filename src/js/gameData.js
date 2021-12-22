export default class GameData {
  constructor() {
    this.array;
  }

  async getGameData(category) {
    if (!this.array) {
      const res = await fetch('../json/image-data.json');
      this.array = await res.json();
    }
    if (category === 'artists') {
      return this.array.slice(0, 120);
    } else if ((category = 'pictures')) {
      return this.array.slice(120, 241);
    }
  }
}
