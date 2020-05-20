import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import SESMailProvider from './implementations/SESMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ses: container.resolve(SESMailProvider),
  ethereal: container.resolve(EtherealMailProvider),
};

export default container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
