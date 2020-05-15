import { container } from 'tsyringe';
import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './fakes/FakeStorageProvider';

export default container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
