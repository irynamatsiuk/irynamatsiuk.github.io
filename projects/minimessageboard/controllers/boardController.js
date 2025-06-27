const db = require("../db/queries");

async function getMessages(req, res) {
  const messages = await db.selectAllMessages();
  res.render("index", {
    title: "Message Board",
    messages: messages,
    link: { href: "/new", text: "+ new message" },
  });
}

async function createMessageGet(req, res) {
  res.render("form", {
    title: "New Message",
    link: { href: "/", text: "back" },
  });
}

async function createMessagePost(req, res) {
  const username = req.body.userName;
  const message = req.body.messageText;
  const date = new Date();
  await db.insertMessage(username, message, date);
  res.redirect("/");
}

async function getMessageById(req, res) {
  const { messageId } = req.params;
  const message = await db.selectMessageById(Number(messageId));

  if (message.length === 0) {
    res.render("404", { title: "404", link: { href: "/", text: "back" } });
    return;
  }

  res.render("details", {
    title: "Message Details",
    singleMessage: message,
    link: { href: "/", text: "back" },
  });
}

module.exports = {
  getMessages,
  createMessageGet,
  createMessagePost,
  getMessageById,
};
