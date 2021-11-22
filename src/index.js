import "./css/index.scss";
import Menu from "./js/initial-menu";
import Settings from "./js/settings";
import Storage from "./js/localStorage";
import GameData from "./js/gameData";
import Game from "./js/game";
import Category from "./js/category";

// Grab the storage data
const storage = new Storage();
storage.initCategoryData();
storage.initSettingsData();
let settingsData = storage.getSettingData();
let categoriesData = storage.getCategoriesData();
settingsData.isScoreOpen = false;

// Menu
const menu = new Menu();
menu.addEventListeners();

// Settings
const settings = new Settings();
settings.loadSettingsData();
settings.addEventListeners();

const gameData = new GameData();
let artistsArray;
let picturesArray;
gameData.getGameData("artists").then((result) => (artistsArray = result));
gameData.getGameData("pictures").then((result) => (picturesArray = result));

const game = new Game();
game.addEventListeners();

const category = new Category();
category.addEventListeners();

export { settingsData, categoriesData, artistsArray, picturesArray };
