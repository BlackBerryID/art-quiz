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

menu.settingsBtn.addEventListener("click", menu.openSettings.bind(menu));
[menu.artistsGameBtn, menu.picturesGameBtn].forEach((item) =>
  item.addEventListener("click", menu.openCategory.bind(menu))
);

// Settings
const settings = new Settings();
settings.loadSettingsData();

export { settingsData };
