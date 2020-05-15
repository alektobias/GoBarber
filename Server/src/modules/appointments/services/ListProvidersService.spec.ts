// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });
    const user2 = await fakeUserRepository.create({
      name: 'John tre',
      email: 'johndtre@email.com',
      password: '123456',
    });
    const logged_user = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@email.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: logged_user.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
