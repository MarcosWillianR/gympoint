import request from '../../utils/request';

import factory from '../../factories';

// Utils
import truncate from '../../utils/truncate';
import auth from '../../utils/authentication';

// Default Messages
import { pt_br } from '../../../src/utils/validations';

const defaultMessages = pt_br.students;

// Bearer Token
let adminToken;

describe('Student', () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeAll(async () => {
    const token = await auth();

    adminToken = `Bearer ${token}`;
  });

  it('create a new Student', async () => {
    const studentAttributes = await factory.attrs('Student');

    const newStudent = await request
      .post('/students')
      .set('Authorization', adminToken)
      .send(studentAttributes);

    expect(newStudent.body).toHaveProperty('id');
  });

  it('create new student with existent e-mail', async () => {
    const studentAttributes = await factory.attrs('Student', {
      email: 'existent_email@mail.com',
    });

    await factory.create('Student', {
      email: 'existent_email@mail.com',
    });

    const response = await request
      .post('/students')
      .set('Authorization', adminToken)
      .send(studentAttributes);

    expect(response.body).toHaveProperty(
      'error',
      defaultMessages.already_exists
    );
  });

  it('update student', async () => {
    const { id } = await factory.create('Student');

    const studentUpdated = await request
      .put(`/students/${id}`)
      .set('Authorization', adminToken)
      .send({ email: 'another_email@mail.com' });

    expect(studentUpdated.body).toHaveProperty(
      'message',
      defaultMessages.success_updated
    );
  });

  it('update inexistent student', async () => {
    const studentUpdated = await request
      .put('/students/555')
      .set('Authorization', adminToken)
      .send({ email: 'another_email@mail.com' });

    expect(studentUpdated.body).toHaveProperty(
      'error',
      defaultMessages.not_exists
    );
  });

  it('delete a student', async () => {
    const { id } = await factory.create('Student');

    const studentDeleted = await request
      .delete(`/students/${id}`)
      .set('Authorization', adminToken);

    expect(studentDeleted.body).toHaveProperty(
      'message',
      defaultMessages.success_removed
    );
  });

  it('delete inexistent student', async () => {
    const studentDeleted = await request
      .delete('/students/555')
      .set('Authorization', adminToken);

    expect(studentDeleted.body).toHaveProperty(
      'error',
      defaultMessages.not_exists
    );
  });

  it('find all students without request filters', async () => {
    await factory.createMany('Student', 10);

    const students = await request
      .get('/students')
      .set('Authorization', adminToken);

    expect(students.body).toHaveLength(10);
  });

  it('find all students with name filter', async () => {
    const name = 'Stephen King';

    await Promise.all([
      factory.createMany('Student', 10),
      factory.create('Student', { name }),
    ]);

    const students = await request
      .get(`/students?search=${name}`)
      .set('Authorization', adminToken);

    expect(students.body).toHaveLength(1);
  });

  it('find one student', async () => {
    const { id } = await factory.create('Student');

    const response = await request
      .get(`/students/${id}`)
      .set('Authorization', adminToken);

    expect(response.body).toHaveProperty('id', id);
  });

  it('find a student that does not exists', async () => {
    const response = await request
      .get('/students/555')
      .set('Authorization', adminToken);

    expect(response.body).toHaveProperty('error', defaultMessages.not_exists);
  });
});
