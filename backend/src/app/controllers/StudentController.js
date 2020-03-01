import '../../bootstrap';
import { Op } from 'sequelize';
import Student from '../models/Student';

import { pt_br } from '../../utils/validations';

const defaultMessages = pt_br.students;

class StudentController {
  async index(req, res) {
    const { search } = req.query;

    const where = {};

    if (search) {
      if (process.env.NODE_ENV !== 'test') {
        where.name = {
          [Op.iLike]: `%${search}%`,
        };
      } else {
        where.name = {
          [Op.like]: `%${search}%`,
        };
      }
    }

    const students = await Student.findAll({
      where,
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(students);
  }

  async show(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id, {
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    if (!student) {
      return res.status(400).json({ error: defaultMessages.not_exists });
    }

    return res.json(student);
  }

  async store(req, res) {
    const { email } = req.body;

    const student = await Student.findOne({
      where: {
        email,
      },
    });

    if (student) {
      return res.status(400).json({ error: defaultMessages.already_exists });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: defaultMessages.not_exists });
    }

    await student.update(req.body);

    return res.json({ message: defaultMessages.success_updated });
  }

  async delete(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: defaultMessages.not_exists });
    }

    await student.destroy();

    return res.json({ message: defaultMessages.success_removed });
  }
}

export default new StudentController();
