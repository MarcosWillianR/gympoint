import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Mail from '../../lib/Mail';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'active', 'price'],
      include: [
        {
          model: Student,
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          attributes: ['title'],
        },
      ],
    });

    return res.json(registrations);
  }

  async show(req, res) {
    const { reg_id } = req.params;

    const registration = await Registration.findByPk(reg_id, {
      attributes: ['id', 'start_date', 'end_date', 'active', 'price'],
      include: [
        {
          model: Student,
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          attributes: ['title'],
        },
      ],
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' });
    }

    return res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /**
     * Verifica se o aluno não existe
     */
    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    /**
     * Verifica se o plano existe
     */
    const planChoosed = await Plan.findByPk(plan_id);

    if (!planChoosed) {
      return res.status(400).json({ error: 'Plan dont exists' });
    }

    const { duration, price } = planChoosed;

    /**
     * Verifica se já possuí matricula
     */
    const alreadyRegistered = await Registration.findOne({
      where: {
        student_id,
      },
    });

    if (alreadyRegistered) {
      return res.status(400).json({ error: 'User already registered' });
    }

    /**
     * Regra de negócio para informar a data final com base no plano escolhido
     */
    const end_date = addMonths(parseISO(start_date), duration);

    /**
     * Regra de negócio para somar o valor final da matrícula
     */
    const total_price = price * duration;

    const { id: registration_id } = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: total_price,
    });

    const end_date_formatted = format(end_date, "d 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
    const total_price_formatted = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total_price);

    await Mail.sendMail({
      to: `${studentExists.name} <${studentExists.email}>`,
      subject: 'Matrícula criada',
      template: 'registration',
      context: {
        student: studentExists.name,
        plan: planChoosed.title,
        end_date: end_date_formatted,
        total_price: total_price_formatted,
        registration_id,
      },
    });

    return res.json({ message: 'Registration was created' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /**
     * Verifica se a matrícula existe
     */
    const registration = await Registration.findByPk(req.params.reg_id);

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exists' });
    }

    /**
     * Regra de negócio para não deixar criar duas matrículas com o mesmo aluno
     */
    if (student_id !== registration.student_id) {
      const student_already_reg = await Registration.findOne({
        where: {
          student_id,
        },
      });

      if (student_already_reg) {
        return res.status(400).json({ error: 'Student already registered' });
      }
    }

    const plan = await Plan.findByPk(plan_id);
    const { duration, price } = plan;
    /**
     * Regra de negócio para informar a data final com base no plano escolhido
     */
    const end_date = addMonths(parseISO(start_date), duration);

    /**
     * Regra de negócio para somar o valor final da matrícula
     */
    const total_price = price * duration;

    await registration.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: total_price,
    });

    return res.json({ message: 'Registration updated successfuly' });
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.reg_id);

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exists' });
    }

    await registration.destroy();

    return res.json({ message: 'Registration deleted successfuly' });
  }
}

export default new RegistrationController();
