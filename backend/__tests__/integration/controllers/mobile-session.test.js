import { addMonths, parseISO } from 'date-fns';
import request from '../../utils/request';
import truncate from '../../utils/truncate';
import factory from '../../factories';
import Registration from '../../../src/app/models/Registration';

import { pt_br } from '../../../src/utils/validations';

const defaultMessages = pt_br;

describe('Mobile session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Create a new mobile session', async () => {
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

    const response = await request
      .post('/mobile-sessions')
      .send({ student_id });

    expect(response.body).toHaveProperty('token');
  });

  it('Create a mobile session with a inexistent student', async () => {
    const response = await request
      .post('/mobile-sessions')
      .send({ student_id: 555 });

    expect(response.body).toHaveProperty(
      'error',
      defaultMessages.students.not_exists
    );
  });

  it('Create a mobile session with a inexistent registration', async () => {
    const { id: student_id } = await factory.create('Student');

    const response = await request
      .post('/mobile-sessions')
      .send({ student_id });

    expect(response.body).toHaveProperty(
      'error',
      defaultMessages.registration.not_exists
    );
  });
});
