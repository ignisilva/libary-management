module.exports = {
  async up(queryInterface, Sequelize) {
    const dummy = [{
      id: 1,
      isbn: '1166570428 9791166570431',
      title: '상대성이론',
      author: '아인슈타인',
      publisher: '과학진흥연구소',
      publishDate: '200210',
      description: '상대성이론에 대하여... ',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      isbn: '1166570428 9791166570432',
      title: '빅뱅이론',
      author: '에드윈허블',
      publisher: '과학진흥연구소',
      publishDate: '211228',
      description: '빅뱅이론에 대하여... ',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 3,
      isbn: '1166570428 9791166570433',
      title: '윤동주가 사랑한 시인',
      author: '이상',
      publisher: '문화를 추구하는 사람들',
      publishDate: '220417',
      description: '오감도 그 외',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 4,
      isbn: '1166570428 9791166570434',
      title: '낭만적인 노래',
      author: '헤르만헤세',
      publisher: '문화를 추구하는 사람들',
      publishDate: '190304',
      description: '나 그대를 사랑하기에',
      createdAt: new Date(),
      updatedAt: new Date(),
    }];

    await queryInterface.bulkInsert('BookInfos', dummy);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BookInfos', null, {});
  },
};
