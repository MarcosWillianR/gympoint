import request from '../../utils/request';
import mobileAuth from '../../utils/mobileAuthentication';
import truncate from '../../utils/truncate';
import { pt_br } from '../../../src/utils/validations';
import factory from '../../factories';

const defaultMessages = pt_br.check_ins;

let studentToken;

describe('Check-ins', () => {
  beforeAll(async () => {
    const token = await mobileAuth();

    studentToken = `Bearer ${token}`;
  });

  beforeEach(async () => {
    await truncate();
  });

  it('Create a new Check-in', async () => {
    const { id: student_id } = await factory.create('Student');

    const response = await request
      .post(`/students/${student_id}/checkins`)
      .set('Authorization', studentToken);

    expect(response.body).toHaveProperty('student_id', student_id);
  });

  it('Error after have 5 check-ins and try to create another in same week', async () => {
    const { id: student_id } = await factory.create('Student');

    await Promise.all([
      request
        .post(`/students/${student_id}/checkins`)
        .set('Authorization', studentToken),
      request
        .post(`/students/${student_id}/checkins`)
        .set('Authorization', studentToken),
      request
        .post(`/students/${student_id}/checkins`)
        .set('Authorization', studentToken),
      request
        .post(`/students/${student_id}/checkins`)
        .set('Authorization', studentToken),
      request
        .post(`/students/${student_id}/checkins`)
        .set('Authorization', studentToken),
    ]);

    const response = await request
      .post(`/students/${student_id}/checkins`)
      .set('Authorization', studentToken);

    expect(response.body).toHaveProperty('error', defaultMessages.max_reached);
  });

  it('List student Check-ins', async () => {
    const { id: student_id } = await factory.create('Student');

    await request
      .post(`/students/${student_id}/checkins`)
      .set('Authorization', studentToken);

    const response = await request
      .get(`/students/${student_id}/checkins`)
      .set('Authorization', studentToken);

    expect(response.body).toHaveLength(1);
  });
});
