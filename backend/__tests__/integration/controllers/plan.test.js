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

  it('delete a created plan', async () => {
    const planAttributes = await factory.attrs('Plan');

    const newPlan = await request(app)
      .post('/plans')
      .set('Authorization', adminToken)
      .send(planAttributes);

    const deletedPlan = await request(app)
      .delete(`/plans/${newPlan.body.id}`)
      .set('Authorization', adminToken);

    expect(deletedPlan.body.message).toBe('Plano removido com sucesso!');
  });

  it('create a plan and list him', async () => {
    const planTitle = 'Gympoint Diamond';
    const planAttributes = await factory.attrs('Plan', {
      title: planTitle,
    });

    const newPlan = await request(app)
      .post('/plans')
      .set('Authorization', adminToken)
      .send(planAttributes);

    const plan = await request(app)
      .get(`/plans/${newPlan.body.id}`)
      .set('Authorization', adminToken);

    expect(plan.body.title).toBe(planTitle);
  });

  it('list all plans', async () => {
    await factory.createMany('Plan', 10);

    const plans = await request(app)
      .get('/plans')
      .set('Authorization', adminToken);

    expect(plans.body).toHaveLength(10);
  });

  it('find an non-existent plan', async () => {
    await factory.createMany('Plan', 10);

    const plans = await request(app)
      .get('/plans/11')
      .set('Authorization', adminToken)
      .expect(400);

    expect(plans.body.error).toBe('Esse plano não existe.');
  });
});
