import { uuid } from 'uuidv4';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { isEqual } from 'date-fns';
import Appointment from '../../infra/typeorm/entities/Appointment';
import IAppontimentsRepository from '../IAppointmentsRepository';

class AppointmentsRepository implements IAppontimentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFound = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return appointmentFound;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
