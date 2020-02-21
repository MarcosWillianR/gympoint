import faker from 'faker/locale/pt_BR';
import { factory } from 'factory-girl';
import { getStudentWeightOrHeight } from './utils';

import Plan from '../src/app/models/Plan';
import Student from '../src/app/models/Student';

factory.define('Plan', Plan, () => ({
  title: faker.commerce.productName(),
  duration: faker.random.number({ min: 1, max: 24 }),
  price: faker.finance.amount(),
}));

factory.define('Student', Student, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number({ min: 0, max: 99 }),
  weight: getStudentWeightOrHeight(0, 999),
  height: getStudentWeightOrHeight(1, 2),
}));

export default factory;
