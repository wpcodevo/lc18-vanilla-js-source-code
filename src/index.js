import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen.js";
import DetailsScreen from "./screens/DetailsScreen.js";
import AboutScreen from "./screens/AboutScreen.js";
import ContactScreen from "./screens/ContactScreen.js";
import Error404Page from "./screens/Error404Page.js";
import { parseRequestUrl, showLoading, hideLoading } from "./utils.js";

const routes = {
  "/": HomeScreen,
  "/blogs/:slug": DetailsScreen,
  "/about": AboutScreen,
  "/contact": ContactScreen,
};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.slug ? "/:slug" : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Page;
  const header = document.getElementById("header");
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById("content");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
