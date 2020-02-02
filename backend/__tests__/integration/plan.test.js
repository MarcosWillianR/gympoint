import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

describe('Plan', () => {
  it('create new Plan', async () => {
    const plan = await factory.create('Plan');

    expect(plan).toHaveProperty('id');
  });

  it('should be able to register a plan', async () => {
    const response = await request(app)
      .post('/plans')
      .send({
        title: 'christmas_specialesdsadsad',
        duration: 14,
        price: 25.0,
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated name', async () => {
    await request(app)
      .post('/plans')
      .send({
        title: 'the demonslayer',
        duration: 14,
        price: 25.0,
      });

    const response = await request(app)
      .post('/plans')
      .send({
        title: 'the demonslayer',
        duration: 14,
        price: 25.0,
      });

    expect(response.status).toBe(400);
  });
});
