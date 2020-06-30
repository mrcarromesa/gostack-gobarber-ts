import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  return res.json(appointmentsRepository.all());
});

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointments = appointmentsRepository.findByDate(parsedDate);

  if (findAppointments) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, date);

  return res.json(appointment);
});

export default appointmentsRouter;
