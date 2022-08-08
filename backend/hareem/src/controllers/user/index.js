const { userService } = require('../../services');

const createUser = async (ctx) => {
  try {
    const user = await userService.createUser(ctx.request.body);

    ctx.body = user;
  } catch (err) {
    ctx.throw(err);
  }
};

const getUsers = async (ctx) => {
  try {
    const users = await userService.getUsers(ctx.request.query);

    ctx.body = users;
  } catch (err) {
    ctx.throw(err);
  }
};

const getUserById = async (ctx) => {
  const { id } = ctx.params;

  try {
    const user = await userService.getUserById(id);

    ctx.body = user;
  } catch (err) {
    ctx.throw(err);
  }
};

const updateUser = async (ctx) => {
  const { id } = ctx.params;

  try {
    const user = await userService.updateUserByAdmin(id, ctx.request.body);

    ctx.body = user;
  } catch (err) {
    ctx.throw(err);
  }
};

const deleteUser = async (ctx) => {
  const { id } = ctx.params;

  try {
    const user = await userService.deleteUser(id);

    ctx.body = user;
  } catch (err) {
    ctx.throw(err);
  }
};

const getUserSelf = async (ctx) => {
  const { id } = ctx.user;

  try {
    const user = await userService.getUserById(id);

    ctx.body = user;
  } catch (err) {
    ctx.throw(err);
  }
};

const updateUserSelf = async (ctx) => {
  const { id } = ctx.user;

  try {
    const user = await userService.updateUser(id, ctx.request.body);

    ctx.body = user;
  } catch (err) {
    ctx.throw(err);
  }
};

const deleteUserSelf = async (ctx) => {
  const { id } = ctx.user;

  try {
    const user = await userService.deleteUser(id);

    ctx.body = user;
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserSelf,
  updateUserSelf,
  deleteUserSelf,
};
