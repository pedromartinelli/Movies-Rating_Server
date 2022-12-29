const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');
const knex = require('../database/knex');

const UserRepository = require('../repositories/UserRepository');
const UserCreateService = require('../services/UserCreateService');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  };

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const user = await knex('users').where('id', user_id).first();

    if (!user) {
      throw new AppError('Usuário não existe.');
    };

    const userwithUpdatedEmail = await knex('users').where('email', email).first();

    if (userwithUpdatedEmail && userwithUpdatedEmail.id !== user.id) {
      throw new AppError('Esse e-mail já está cadastrado.');
    };

    if (password && !old_password || !old_password) {
      throw new AppError('Você precisa informar a senha atual.');
    };

    if (old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('A senha atual não confere.');
      }
    };

    if (password && old_password) {
      if (password.length < 8) {
        throw new AppError('A nova senha deve ter no mínimo 8 caracteres.')

      } else {
        const checkOldPassword = await compare(old_password, user.password);

        if (!checkOldPassword) {
          throw new AppError('A senha atual não confere.');
        };
        user.password = await hash(password, 8);
      }
    };

    await knex('users').where('id', user_id).update({
      name,
      email,
      password: user.password
    });

    return response.json();
  };
};

module.exports = UsersController;