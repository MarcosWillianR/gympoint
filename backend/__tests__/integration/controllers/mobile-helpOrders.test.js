import faker from 'faker/locale/pt_BR';
import request from '../../utils/request';
import mobileAuth from '../../utils/mobileAuthentication';
import { pt_br } from '../../../src/utils/validations';
import factory from '../../factories';

const defaultMessages = pt_br.help_order;

let studentToken;

describe('Help orders', () => {
  beforeAll(async () => {
    const token = await mobileAuth();

    studentToken = `Bearer ${token}`;
  });

  it('Create a new help order', async () => {
    const { id: student_id } = await factory.create('Student');

    const response = await request
      .post(`/students/${student_id}/help-orders`)
      .set('Authorization', studentToken)
      .send({ question: faker.lorem.paragraph() });

    expect(response.body).toHaveProperty('_id');
  });

  it('List only requests for help made by the student', async () => {
    const { id: student_id } = await factory.create('Student');

    await request
      .post(`/students/${student_id}/help-orders`)
      .set('Authorization', studentToken)
      .send({ question: faker.lorem.paragraph() });

    const response = await request
      .get(`/students/${student_id}/help-orders`)
      .set('Authorization', studentToken);

    expect(response.body).toHaveLength(1);
  });

  it('List one request for help', async () => {
    const { id: student_id } = await factory.create('Student');

    const question = await request
      .post(`/students/${student_id}/help-orders`)
      .set('Authorization', studentToken)
      .send({ question: faker.lorem.paragraph() });

    const response = await request
      .get(`/students/${student_id}/help-orders/${question.body._id}`)
      .set('Authorization', studentToken);

    expect(response.body).toHaveProperty('_id', question.body._id);
  });

  it('List one request that does not exists', async () => {
    const { id: student_id } = await factory.create('Student');

    const response = await request
      .get(`/students/${student_id}/help-orders/555`)
      .set('Authorization', studentToken);

    expect(response.body).toHaveProperty(
      'error',
      defaultMessages.question_not_found
    );
  });
});
