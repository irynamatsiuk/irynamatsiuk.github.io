const asyncHandler = require("express-async-handler");
const db = require("../db");
const messages = db.messages;

const getMessageBoard = (req, res) => {
  res.render("index", {
    title: "Message Board",
    messages: messages,
    link: { href: "/new", text: "+ new message" },
  });
};

const getForm = (req, res) => {
  res.render("form", {
    title: "New Message",
    link: { href: "/", text: "back" },
  });
};

const postMessage = (req, res) => {
  const newId = messages[messages.length - 1].id + 1;
  messages.push({
    id: newId,
    text: req.body.messageText,
    user: req.body.userName,
    added: new Date(),
  });
  res.redirect("/");
};

const getMessageById = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const message = await db.getMessageById(Number(messageId));

  if (!message) {
    res.render("404", { title: "404", link: { href: "/", text: "back" } });
    return;
  }

  res.render("details", {
    title: "Message Details",
    message: message,
    link: { href: "/", text: "back" },
  });
});

module.exports = { getMessageBoard, getForm, postMessage, getMessageById };
