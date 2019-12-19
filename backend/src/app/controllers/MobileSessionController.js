import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Registration from '../models/Registration';
import Student from '../models/Student';

import AuthConfig from '../../configs/Auth';

class MobileSessionController {
  async store(req, res) {
    const { student_id } = req.body;

    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Ver se o aluno existe
     */
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    /**
     * Verificar se possui uma matrícula
     */
    const registration = await Registration.findOne({
      where: {
        student_id,
      },
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' });
    }

    /**
     * Regra de negócio se apenas usuários com a matrícula ativa
     * podem entrar no aplicativo ainda não implementado (precisa?)
     */

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
