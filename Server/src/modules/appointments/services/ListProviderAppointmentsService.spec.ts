// import AppError from '@shared/errors/AppError';
import FakeAppointmentReposiotry from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentReposiotry;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentReposiotry();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a especific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'provider',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'provider',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const list = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(list).toEqual([appointment1, appointment2]);
  });
});
