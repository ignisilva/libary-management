const getRentalTemplate = (rentalStartInfo) => {
  const { email, dueDate } = rentalStartInfo;

  const template = `
  <hmtl>
    <body>
      <div>
        <h1>바로고 도서관</h1>
        <div>
          <div>안녕하세요. ${email}님.</div>
          <div>대여하신 도서 반납 예정일에 대해 안내드립니다.</div>
          <div>반납 예정일은 "${dueDate}" 입니다.</div>
          <div>반납 예정일이 주말일 경우, 차주 월요일까지 반납 가능하십니다.</div>
          <div>감사합니다.</div>
        </div>
      </div>
    </body>
  </html>
  `;

  return template;
};

module.exports = {
  getRentalTemplate,
};
