import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import AuthConfig from '../../configs/Auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, email } = user;

    return res.status(201).json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, AuthConfig.secretKey, {
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
