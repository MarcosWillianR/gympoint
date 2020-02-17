import '../../src/bootstrap';
import request from 'supertest';
import app from '../../src/app';

export default async () => {
  const { TEST_AUTH_NAME, TEST_AUTH_LOGIN, TEST_AUTH_PASS } = process.env;

  const admin = await request(app)
    .post('/test/admin-create')
    .send({
      name: TEST_AUTH_NAME,
      email: TEST_AUTH_LOGIN,
      password: TEST_AUTH_PASS,
    })
    .expect(201);

  const { email, password } = admin.body;

  const auth = await request(app)
    .post('/sessions')
    .send({ email, password })
    .expect(201);

  return auth.body.token;
};
