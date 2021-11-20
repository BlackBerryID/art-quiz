import "./css/index.scss";
import Menu from "./js/initial-menu";
import Settings from "./js/settings";
import Storage from "./js/localStorage";
import GameData from "./js/gameData";
import Game from "./js/game";

// Grab the storage data
const storage = new Storage();
storage.initCategoryData();
storage.initSettingsData();
let settingsData = storage.getSettingData();
let categoriesData = storage.getCategoriesData();

// Menu
const menu = new Menu();

// Settings
const settings = new Settings();
settings.loadSettingsData();

const gameData = new GameData();
let artistsArray;
let picturesArray;
gameData.getGameData("artists").then((result) => (artistsArray = result));
gameData.getGameData("pictures").then((result) => (picturesArray = result));

const game = new Game();

export { settingsData, categoriesData, artistsArray, picturesArray };
