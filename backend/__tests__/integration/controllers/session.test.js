import '../../../src/bootstrap';
import request from '../../utils/request';

// Utils
import truncate from '../../utils/truncate';

// Default Messages
import { pt_br } from '../../../src/utils/validations';

const defaultMessages = pt_br.admin_session;

describe('Session', () => {
  beforeEach(async () => {
    await truncate();

    const {
      TEST_AUTH_NAME: name,
      TEST_AUTH_LOGIN: email,
      TEST_AUTH_PASS: password,
    } = process.env;

    await request
      .post('/test/admin-create')
      .send({ name, email, password })
      .expect(201);
  });

  it('create a new admin session in application', async () => {
    const { TEST_AUTH_LOGIN: email, TEST_AUTH_PASS: password } = process.env;

    const response = await request.post('/sessions').send({ email, password });

    expect(response.body).toHaveProperty('token');
  });

  it('new admin session with a non-existent admin account (email invalid)', async () => {
    const { TEST_AUTH_PASS: password } = process.env;

    const response = await request
      .post('/sessions')
      .send({ email: 'incorrect_user@email.com', password });

    expect(response.body).toHaveProperty('error', defaultMessages.not_exists);
  });

  it('new admin session with a invalid password', async () => {
    const { TEST_AUTH_LOGIN: email } = process.env;

    const response = await request
      .post('/sessions')
      .send({ email, password: 'incorrect_password' });

    expect(response.body).toHaveProperty(
      'error',
      defaultMessages.invalid_password
    );
  });
});
