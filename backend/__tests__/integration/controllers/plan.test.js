import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factories';

// Utils
import truncate from '../../utils/truncate';
import auth from '../../utils/authentication';

// Bearer Token
let adminToken;

describe('Plan', () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeAll(async () => {
    const token = await auth();

    adminToken = `Bearer ${token}`;
  });

  it('should be able to create a new Plan', async () => {
    const planAttributes = await factory.attrs('Plan');

    const newPlan = await request(app)
      .post('/plans')
      .set('Authorization', adminToken)
      .send(planAttributes);

    expect(newPlan.body).toHaveProperty('id');
  });

  it('edit a created plan', async () => {
    const edittedTitle = 'Gympoint Special';
    const planAttributes = await factory.attrs('Plan', {
      title: 'Christmas Special',
    });

    const newPlan = await request(app)
      .post('/plans')
      .set('Authorization', adminToken)
      .send(planAttributes);

    const editPlan = await request(app)
      .put(`/plans/${newPlan.body.id}`)
      .set('Authorization', adminToken)
      .send({ title: edittedTitle });

    expect(editPlan.body.title).toBe(edittedTitle);
  });
});
