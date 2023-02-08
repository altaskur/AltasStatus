function getDate() {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Date().toLocaleDateString('es-ES', options);
}

function getPathDate() {
  const today = new Date();
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = today.getMonth() < 10 ? `0${today.getMonth()}` : today.getMonth();
  const year = today.getFullYear();

  return `${day}_${month}_${year}`;
}

module.exports = {
  getDate,
  getPathDate,
};
