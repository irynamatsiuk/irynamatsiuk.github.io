import "./styles.css";
import createHomeTab from "./home.js";
import createContactTab from "./contact.js";
import createMenuTab from "./menu.js";

// Home Tab
// autoload
document.addEventListener("DOMContentLoaded", (event) => {
  createHomeTab();
});
// load on click
document.querySelector("#home-btn").addEventListener("click", (event) => {
  document.querySelector("#content").replaceChildren();
  createHomeTab();
});

// Contact Tab load on click
document.querySelector("#contact-btn").addEventListener("click", (event) => {
  document.querySelector("#content").replaceChildren();
  createContactTab();
});

// Menu Tab load on click
document.querySelector("#menu-btn").addEventListener("click", (event) => {
  document.querySelector("#content").replaceChildren();
  createMenuTab();
});
