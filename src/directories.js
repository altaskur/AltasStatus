const fs = require('fs');

function checkDirectory(dirPath) {
  fs.existsSync(dirPath);
}

function createDirectory(dirPath) {
  if (!checkDirectory(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

function appendToFile(dirPath, data) {
  fs.writeFileSync(dirPath, JSON.stringify(data, null, 4), { encoding: 'utf8' });
}

module.exports = {
  createDirectory,
  appendToFile,
};
