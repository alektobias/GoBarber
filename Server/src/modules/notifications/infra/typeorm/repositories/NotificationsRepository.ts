import { getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNoticationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '../../../repositories/INotificationsRepository';
import Notification from '../schemas/Notification';

export default class NotificationsRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNoticationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(notification);

    return notification;
  }
}
