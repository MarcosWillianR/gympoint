import '../../src/bootstrap';
import request from './request';

export default async () => {
  const {
    TEST_AUTH_NAME: name,
    TEST_AUTH_LOGIN: email,
    TEST_AUTH_PASS: password,
  } = process.env;

  const admin = await request
    .post('/test/admin-create')
    .send({ name, email, password })
    .expect(201);

  const auth = await request
    .post('/sessions')
    .send({ email: admin.body.email, password: admin.body.password })
    .expect(201);

  return auth.body.token;
};
