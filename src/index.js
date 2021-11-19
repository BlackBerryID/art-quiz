import "./css/index.scss";
import Menu from "./js/initial-menu";
import Settings from "./js/settings";
import Storage from "./js/localStorage";

// Grab the storage data
const storage = new Storage();
storage.initCategoryData();
storage.initSettingsData();
let settingsData = storage.grabSettingData();

// Menu
const menu = new Menu();

// Settings
const settings = new Settings();
settings.loadSettingsData();

export { settingsData };
