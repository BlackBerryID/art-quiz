import "./css/index.scss";
import Menu from "./js/initial-menu";
import Settings from "./js/settings";

// Menu
const menu = new Menu();

menu.settingsBtn.addEventListener("click", menu.openSettings.bind(menu));
[menu.artistsGameBtn, menu.picturesGameBtn].forEach((item) =>
  item.addEventListener("click", menu.openCategory.bind(menu))
);

// Settings
const settings = new Settings();
