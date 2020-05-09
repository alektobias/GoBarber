import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('Update User Avatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update the user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should delete old avatar on update', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.png',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
  });

  it('should not be able to update avatar from a non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatar_filename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
