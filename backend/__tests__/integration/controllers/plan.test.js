import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factories';
import truncate from '../../utils/truncate';

describe('Plan', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a new Plan using Sequelize', async () => {
    const plan = await factory.create('Plan');

    expect(plan).toHaveProperty('id');
  });
});
