const ERROR_CODE = {
  // BAD_REQUEST
  INVALID_REQUEST: 'INVALID_REQUEST',
  INVALID_DATA: 'INVALID_DATA',

  // UNAUTHORIZED
  LOGIN_FAIL: 'LOGIN_FAIL',
  NOT_FOUND_TOKEN: 'NOT_FOUND_TOKEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  VERIFY_FAIL_TOKEN: 'VERIFY_FAIL_TOKEN',

  // FORBIDDEN
  PERMISSION_DENIED: 'PERMISSION_DENIED',

  // NOT_FOUNT
  NOT_FOUND_RESOURCE: 'NOT_FOUND_RESOURCE',

  // CONFILCT
  ALREADY_EXIST_RESOURCE: 'ALREADY_EXIST_RESOURCE',

  // INTERNAL_SERVER_ERROR
  DB_FAIL: 'DB_FAIL',
  UNKNOWN: 'UNKNOWN',
  SERVER_ERROR: 'SERVER_ERROR',
};

const ERROR_MESSAGE = {
  // BAD_REQUEST
  INVALID_REQUEST: {
    STANDARD: '유효하지 않은 요청입니다.',
    // USER
    DELETE_FAIL_USER: '회원 탈퇴에 실패했습니다.',
    BLACK_USER_CAN_NOT_RENTAL: '연체 이력이 많아 대여할 수 없습니다.',
    BLACK_USER_CAN_NOT_RESERVATION: '연체 이력이 많아 대여할 수 없습니다.',
    // BOOK
    DELETE_FAIL_BOOK: '해당 도서 삭제에 실패했습니다.',
    NO_MORE_REGISTER_BOOK: '해당 도서를 더 이상 등록할 수 없습니다.',
    // RENTAL
    ALREADY_RENTAL_LIMIT: '가능한 대여 권 수 이상으로 대여 할 수 없습니다.',
    NOT_EXIST_RENTALABLE_BOOK: '대여 가능한 도서 재고가 없습니다.',
    THE_BOOK_IS_RESERVATED: '해당 도서는 예약 되어 있습니다.',
    THE_BOOK_IS_NOT_RENTALED: '도서를 대여한 적이 없습니다.',
    THE_BOOK_IS_ALREADY_RETURNED: '이미 반납된 도서입니다.',
    NO_MORE_EXTENSTION: '더 이상 대여를 연장 할 수 없습니다.',
    NOT_EXTENSION_DUE_DATE: `연장은 반납 ${process.env.DAYS_BEFORE_RETURN}일 전부터 가능합니다`,
    EXTENSION_FAIL_RENTAL: '대여 연장에 실패했습니다.',
    // RESERVATION
    DELETE_FAIL_RESERVATION: '예약 취소에 실패했습니다',
    THE_BOOK_IS_RENTALABLE: '대여 할 수 있는 도서입니다',
    ALREADY_RESERVATIONED: '이미 도서에 대한 예약을 했습니다',
  },
  INVALID_DATA: { STANDARD: '유효하지 않은 데이터입니다.' },

  // UNAUTHORIZED
  LOGIN_FAIL: { STANDARD: '아이디 또는 비밀번호가 틀렸습니다.' },
  NOT_FOUND_TOKEN: {
    STANDARD: 'token을 찾을 수 없습니다.',
    ACCESS: 'access token을 찾을 수 없습니다.',
    REFRESH: 'refresh token을 찾을 수 없습니다.',
  },
  INVALID_TOKEN: {
    STANDARD: '유효하지 않은 token입니다.',
    ACCESS: '유효하지 않은 access token입니다.',
    REFRESH: '유효하지 않은 refresh token입니다.',
  },
  VERIFY_FAIL_TOKEN: {
    STANDARD: '검증에 실패한 token입니다.',
    ACCESS: '검증에 실패한 access token입니다.',
    REFRESH: '검증에 실패한 refresh token입니다',
  },

  // FORBIDDEN
  PERMISSION_DENIED: { STANDARD: '접근 권한이 없습니다.' },

  // NOT_FOUNT
  NOT_FOUND_RESOURCE: {
    STANDARD: '해당하는 자원을 찾을 수 없습니다.',
    USER: '해당 회원을 찾을 수 없습니다.',
    BOOK_INFO: '해당 도서 정보를 찾을 수 없습니다.',
    BOOK: '해당 도서를 찾을 수 없습니다.',
    RENTAL: '해당 대여 기록을 찾을 수 없습니다.',
  },

  // CONFILCT
  ALREADY_REGISTED_RESOURCE: {
    STANDARD: '이미 등록된 자원입니다.',
    // USER
    EMAIL: '이미 등록된 이메일입니다.',
  },

  // INTERNAL_SERVER_ERROR
  DB_FAIL: { STANDARD: '데이터베이스 문제입니다.' },
  UNKNOWN: { STANDARD: '알 수 없는 문제입니다.' },
  SERVER_ERROR: { STANDARD: '서버 에러입니다.' },
};

module.exports = {
  ERROR_CODE,
  ERROR_MESSAGE,
};
