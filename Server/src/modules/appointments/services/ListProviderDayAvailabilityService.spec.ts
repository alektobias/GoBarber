// import AppError from '@shared/errors/AppError';
import FakeAppointmentReposiotry from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailability from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentReposiotry;
let listProviderDayAvailability: ListProviderDayAvailability;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentReposiotry();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availibility from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 21, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider id',
      user_id: 'user id',
      date: new Date(2020, 4, 21, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 11).getTime();
    });

    const availibility = await listProviderDayAvailability.execute({
      provider_id: 'user id',
      day: 21,
      year: 2020,
      month: 5,
    });

    expect(availibility).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
