const messages = [
  {
    id: 1,
    text: "It’s not stealing if I prayed over it first",
    user: "Anonymous colleague",
    added: new Date(),
  },
  {
    id: 2,
    text: "Plot twist: Your lunch left you. It wanted more spice in its life",
    user: "No Name",
    added: new Date(),
  },
  {
    id: 3,
    text: "I didn’t steal it — I adopted it. It has a new, loving home now",
    user: "New family",
    added: new Date(),
  },
];

async function getMessageById(messageId) {
  return messages.find((message) => message.id === messageId);
}

module.exports = { messages, getMessageById };
