/* eslint-disable no-underscore-dangle */
const cron = require('node-cron');
const {
  sequelize, User,
} = require('./database/models');

const _blackUserUpdate = async () => {
  const query = `
    select * from "Rentals" 
    where id not in (
      select id from "Rentals" 
      where "parentId" in (
        select "parentId" from "Rentals" 
        where state = 'END'))
    order by id ASC`;

  const rentals = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });

  const distinctRentalHistory = new Map();
  rentals.forEach((rental) => {
    distinctRentalHistory.set(rental.parentId, rental);
  });

  const rentalHistory = Array.from(distinctRentalHistory.values());

  const overDueRentalHistory = rentalHistory.filter((rental) => new Date() > rental.dueDate);

  const blackUserIds = new Set();

  overDueRentalHistory.forEach((overDueRental) => {
    blackUserIds.add(overDueRental.userId);
  });

  blackUserIds.forEach(async (blackUserId) => {
    await User.update({
      isBlack: true,
    }, {
      where: { id: blackUserId },
    });
  });
};

// 매일 오전 4시 동작 ?
const scheduler = cron.schedule('0 4 * * *', async () => {
  // 블랙리스트 업데이트
  await _blackUserUpdate();
}, {
  scheduled: false,
});

module.exports = scheduler;
