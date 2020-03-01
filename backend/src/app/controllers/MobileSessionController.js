import jwt from 'jsonwebtoken';
import Registration from '../models/Registration';
import Student from '../models/Student';

import AuthConfig from '../../configs/Auth';

import { pt_br } from '../../utils/validations';

const defaultMessages = pt_br;

class MobileSessionController {
  async store(req, res) {
    const { student_id } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(400)
        .json({ error: defaultMessages.students.not_exists });
    }

    const registration = await Registration.findOne({
      where: {
        student_id,
      },
    });

    if (!registration) {
      return res
        .status(400)
        .json({ error: defaultMessages.registration.not_exists });
    }

    const { id, name } = student;

    return res.json({
      student: {
        id,
        name,
      },
      token: jwt.sign({ id, name }, AuthConfig.secretKey, {
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}

export default new MobileSessionController();
