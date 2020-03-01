import { addMonths, parseISO } from 'date-fns';
import request from './request';
import factory from '../factories';

import Registration from '../../src/app/models/Registration';

export default async () => {
  const { id: student_id } = await factory.create('Student');
  const { id: plan_id, duration, price } = await factory.create('Plan');
  const start_date = new Date();

  const end_date = addMonths(parseISO(start_date), duration);
  const total_price = price * duration;

  await Registration.create({
    student_id,
    plan_id,
    start_date,
    end_date,
    price: total_price,
  });

  const response = await request.post('/mobile-sessions').send({ student_id });

  return response.body.token;
};
