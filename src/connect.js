const tmi = require('tmi.js');
const { getPathDate, getDate } = require('./dateFunctions');
const { createDirectory, appendToFile } = require('./directories');

const { saveUserJoin, saveNewMessage } = require('./monitoring');

const CHANNEL_NAME = 'altaskur';

let monitorStatus = false;

const dataPath = `./${getPathDate()}`;

console.log(dataPath);

const CLIENT = new tmi.Client({
  channels: [CHANNEL_NAME],
});

const totalOfMessages = [];
const totalOfViewers = [];

CLIENT.on('connecting', () => {
  console.log(`Me estoy conectado al canal de ${CHANNEL_NAME}`);
});

CLIENT.on('connected', () => {
  console.log(`Conectado correctamente al canal de ${CHANNEL_NAME}`);
});

// client.on('subscription', (channel, username, methods, message, userState) => {
//   console.log(`${username}se ha subscrito: ${methods}`);
// });

CLIENT.on('join', (channels, username, self) => {
  const userJoinData = saveUserJoin(username, self, getDate());
  if (userJoinData && monitorStatus) {
    totalOfViewers.push(userJoinData);
    appendToFile((`${dataPath}usersJoin`), totalOfViewers);
  }
});

CLIENT.on('message', (channel, userState, message, self) => {
  const newMessageData = saveNewMessage(userState, message, self, getDate());

  if ((userState.username === CHANNEL_NAME) || userState.mod) {
    if (message.startsWith('!startBot')) {
      monitorStatus = true;
      createDirectory(dataPath);
    }
    if (message.startsWith('!stopBot')) {
      monitorStatus = false;
    }
    console.log(`La monitorización esta ${monitorStatus}`);
  }

  if (newMessageData && monitorStatus) {
    totalOfMessages.push(newMessageData);
  }
  console.log(totalOfMessages);
});

module.exports = CLIENT;
