import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('Show Profile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const showProfile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showProfile.name).toBe('John Doe');
    expect(showProfile.email).toBe('johndoe@email.com');
  });
  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfileService.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
