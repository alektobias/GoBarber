// import AppError from '@shared/errors/AppError';
import FakeAppointmentReposiotry from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailability from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentReposiotry;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe('List Provider Month Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentReposiotry();
    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availibility from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availibility = await listProviderMonthAvailability.execute({
      provider_id: 'provider id',
      year: 2020,
      month: 5,
    });

    expect(availibility).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
