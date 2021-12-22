import { settingsData } from '../index';
import Category from './category';

export default class Menu {
  constructor() {
    this.artistsGameBtn = document.querySelector('.category-selection-artists');
    this.picturesGameBtn = document.querySelector('.category-selection-pictures');
    this.settingsBtn = document.querySelector('.settings-btn');
    this.settingsPage = document.querySelector('.settings');
    this.initialMenu = document.querySelector('.initial');
    this.categoryPage = document.querySelector('.categories');
    this.player = new Audio('../assets/mp3/push.mp3');
    this.category = new Category();
  }

  addEventListeners() {
    this.settingsBtn.addEventListener('click', () => this.openSettings());
    [this.artistsGameBtn, this.picturesGameBtn].forEach((item) =>
      item.addEventListener('click', (e) => this.openCategory(e))
    );
  }

  openCategory(e) {
    const targetCategory = e.path[1].classList.contains('artists') ? 'artists' : 'pictures';
    this.animateOpening(targetCategory);
    this.initialMenu.classList.add('untouchable');
    setTimeout(() => {
      this.initialMenu.classList.add('hide');
      setTimeout(() => this.showPage(this.categoryPage, targetCategory), 200);
      this.player.volume = settingsData.volume;
      this.player.play();
      if (targetCategory === 'artists') {
        settingsData.activeCategory = 'artists';
        this.category.show('artists');
      } else if (targetCategory === 'pictures') {
        settingsData.activeCategory = 'pictures';
        this.category.show('pictures');
      }
    }, 1000);
  }

  animateOpening(category) {
    if (category === 'artists') {
      this.artistsGameBtn.classList.add('moveDown');
      this.picturesGameBtn.classList.add('scale');
      this.picturesGameBtn.classList.add('hide');
    } else if (category === 'pictures') {
      this.picturesGameBtn.classList.add('moveUp');
      this.artistsGameBtn.classList.add('scale');
      this.artistsGameBtn.classList.add('hide');
    }
  }

  restoreMenuAppearance(category) {
    if (category === 'artists') {
      this.artistsGameBtn.classList.remove('moveDown');
      this.picturesGameBtn.classList.remove('scale');
      this.picturesGameBtn.classList.remove('hide');
    } else if (category === 'pictures') {
      this.picturesGameBtn.classList.remove('moveUp');
      this.artistsGameBtn.classList.remove('scale');
      this.artistsGameBtn.classList.remove('hide');
    }
  }

  openSettings() {
    this.initialMenu.classList.add('untouchable');
    this.initialMenu.classList.add('hide');
    setTimeout(() => this.showPage(this.settingsPage), 200);
    settingsData.prevPage = 'menu';
    this.player.volume = settingsData.volume;
    this.player.play();
  }

  showPage(page, targetCategory) {
    this.initialMenu.classList.add('remove');
    this.initialMenu.classList.remove('untouchable');
    page.classList.remove('remove');
    if (targetCategory) this.restoreMenuAppearance(targetCategory);
    setTimeout(() => page.classList.remove('hide'), 50);
  }
}
