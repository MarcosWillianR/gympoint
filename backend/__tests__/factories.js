import faker from 'faker';
import { factory } from 'factory-girl';

import Plan from '../src/app/models/Plan';

factory.define('Plan', Plan, {
  title: faker.commerce.productName(),
  duration: faker.random.number({ min: 1, max: 24 }),
  price: faker.finance.amount(),
});

export default factory;
