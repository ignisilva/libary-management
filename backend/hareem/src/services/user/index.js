/* eslint-disable max-len */
const { hashService } = require('../index');
const { userRepository } = require('../../repositories');
const { CustomError } = require('../../errors');
const { ERROR_CODE, ERROR_MESSAGE } = require('../../constants/error');

const createUser = async (createData) => {
  const {
    email,
    password,
  } = createData;

  const getBy = { email };
  const user = await userRepository.getUser(getBy);
  if (user?.email === email) {
    throw new CustomError(ERROR_CODE.ALREADY_REGISTED_RESOURCE, ERROR_MESSAGE.ALREADY_REGISTED_RESOURCE.EMAIL);
  }

  const hashedPassword = await hashService.hash(password);
  const newUser = await userRepository.createUser({
    ...createData,
    password: hashedPassword,
  });

  return newUser;
};

const getUsers = async (query) => {
  const users = await userRepository.getUsers(query);

  return users;
};

const getUser = async (getBy, selectPassword = false) => {
  const user = await userRepository.getUser(getBy, selectPassword);
  if (!user) {
    throw new CustomError(ERROR_CODE.NOT_FOUND_RESOURCE, ERROR_MESSAGE.NOT_FOUND_RESOURCE.USER);
  }

  return user;
};

const getUserById = async (id, only = false) => {
  const user = await userRepository.getUserById(id, only);
  if (!user) {
    throw new CustomError(ERROR_CODE.NOT_FOUND_RESOURCE, ERROR_MESSAGE.NOT_FOUND_RESOURCE.USER);
  }

  return user;
};

const updateUser = async (id, updateData) => {
  const {
    only = false,
  } = updateData;

  await userRepository.updateUser({ id }, updateData);

  const user = await userRepository.getUserById(id, only);
  if (!user) {
    throw new CustomError(ERROR_CODE.NOT_FOUND_RESOURCE, ERROR_MESSAGE.NOT_FOUND_RESOURCE.USER);
  }

  return user;
};

const updateUserByAdmin = async (id, updateData) => {
  await userRepository.updateUserByAdmin(id, updateData);

  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new CustomError(ERROR_CODE.NOT_FOUND_RESOURCE, ERROR_MESSAGE.NOT_FOUND_RESOURCE.USER);
  }

  return user;
};

const deleteUser = async (id) => {
  const result = await userRepository.deleteUser({ id });
  if (!result) {
    throw new CustomError(ERROR_CODE.INVALID_REQUEST, ERROR_MESSAGE.INVALID_REQUEST.USER);
  }

  return '회원 탈퇴 완료';
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateUserByAdmin,
  deleteUser,
};
