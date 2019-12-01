import User from '../models/User';
import jwt from 'jsonwebtoken';

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
      token: jwt.sign({ id }, 'e1e607089e4cd402590b748365694458', {
        expiresIn: '3 days'
      })
    })
  }
}

export default new SessionController();
