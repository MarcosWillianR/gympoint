import jwt from 'jsonwebtoken';

import User from '../models/User';

import AuthConfig from '../../configs/Auth';

class SessionController {
  async store(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: 'Password does not match' });
    };


    const { id, name, email } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, AuthConfig.secretKey, {
        expiresIn: AuthConfig.expiresIn
      })
    })
  }
}

export default new SessionController();
