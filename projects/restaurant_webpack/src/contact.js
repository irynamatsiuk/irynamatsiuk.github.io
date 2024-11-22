function createElement(element, text, classname) {
  const el = document.createElement(element);
  el.textContent = text;
  el.classList.add(classname);
  document.querySelector("#content").appendChild(el);
}

export default function createContactTab() {
  const tel = "+39 055 123 4567";
  createElement(
    "p",
    "Enjoy a taste of Italy, just like Nonna used to make!",
    "motto"
  );
  createElement("h4", "Address:");
  createElement("p", "Calle Inexistente, 12 50023 Firenze, Italia");
  createElement(
    "p",
    "(Behind the old fountain, next to the wine shop)",
    "comment"
  );
  createElement("h4", "Call us:");
  createElement("p", tel);
  createElement("h4", "Email:");
  createElement("p", "info@holycannoly.it");
  createElement("h4", "Reserve Your Table:");
  createElement("p", `Just send us a message on WhatsApp: ${tel}`);
  createElement(
    "p",
    "(We'll save you a seat and a glass of Chianti!)",
    "comment"
  );
}
