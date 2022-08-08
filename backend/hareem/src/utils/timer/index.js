const stringToDate = (string = '220101') => new Date(`
  20${string.substring(0, 2)}-
  ${string.substring(2, 4)}-
  ${string.substring(4, 6)}`);

// 차후, findAll의 from, to 부분을 아래 함수를 쓰지 않는 쪽으로 리팩토링 해야 함
const dateToString = (date, separator = '') => {
  const year = String(date.getFullYear()).substring(2, 4);

  let month = String(date.getMonth() + 1);
  month = month.length < 2 ? `0${month}` : month;

  let day = String(date.getDate());
  day = day.length < 2 ? `0${day}` : day;

  return year + separator + month + separator + day;
};

const afterNDate = (n = 0, fromDate = new Date()) => {
  const today = new Date(`${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`);
  return new Date(today.setDate(today.getDate() + Number(n)));
};

const beforeNDate = (n = 0, fromDate = new Date()) => {
  const today = new Date(`${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`);
  return new Date(today.setDate(today.getDate() - Number(n)));
};

module.exports = {
  stringToDate,
  dateToString,
  afterNDate,
  beforeNDate,
};
