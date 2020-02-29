import jwt from 'jsonwebtoken';
import User from '../models/User';
import AuthConfig from '../../configs/Auth';
import { pt_br } from '../../utils/validations';

const defaultMessages = pt_br.admin_session;

class SessionController {
  async store(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: defaultMessages.not_exists });
    }

    if (!(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: defaultMessages.invalid_password });
    }

    const { id, name, email } = user;

    return res.status(201).json({
      user: { id, name, email },
      token: jwt.sign({ id }, AuthConfig.secretKey, {
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
