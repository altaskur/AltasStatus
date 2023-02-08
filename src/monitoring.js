function saveUserJoin(userName, self, getDate) {
  if (!self && userName !== 'StreamElements' && userName !== 'altasbot' && userName !== 'El_pato_bot') {
    const dateOfJoin = getDate;
    const altasJoin = {
      userName,
      date: dateOfJoin,
    };
    return altasJoin;
  }
  return false;
}

function saveNewMessage(userState, message, self, getDate) {
  if (!self && userState['display-name'] !== 'StreamElements' && userState['display-name'] !== 'altasbot' && userState['display-name'] !== 'El_pato_bot') {
    const dateOfMessage = getDate;
    console.log(`El usuario ${userState.username} ha mandado ${message} ${dateOfMessage}`);

    const messageStructure = {
      userState,
      message,
      date: dateOfMessage,
    };
    return messageStructure;
  }
  return false;
}

module.exports = { saveUserJoin, saveNewMessage };
