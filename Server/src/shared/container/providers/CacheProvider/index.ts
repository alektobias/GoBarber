import { container } from 'tsyringe';
import ICacheProvider from './models/ICacheProvider';
import RedisCacheProvider from './implementations/RedisCacheProvider';

export default container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider,
);
