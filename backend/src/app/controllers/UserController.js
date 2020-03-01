import User from '../models/User';

class UserController {
  async store(req, res) {
    const newAdminUser = await User.create(req.body);

    return res.status(201).json(newAdminUser);
  }
}

export default new UserController();
