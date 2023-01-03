const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');

const AppError = require('../utils/AppError');

describe('UserTests', () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it('user should be create', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '12345678'
    };
    
    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty('id');
  });

  it('user not should be created if email is already registered', async () => {
    const user1 = {
      name: 'User Test1',
      email: 'user@test.com',
      password: '12345678'
    }

    const user2 = {
      name: 'User Test2',
      email: 'user@test.com',
      password: '12345678'
    }

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError('Este e-mail já está em uso.'));
  });
})


