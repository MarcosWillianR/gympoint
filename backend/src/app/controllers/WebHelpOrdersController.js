import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import HelpOrders from '../schemas/HelpOrders';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

class WebHelpOrdersController {
  async index(req, res) {
    const ordersNotAnswered = await HelpOrders.find()
      .where('answer_at')
      .equals(null);

    if (!ordersNotAnswered) {
      return res.status(400).json({
        error: 'Seems like are not anyone student question to answer',
      });
    }

    return res.json(ordersNotAnswered);
  }

  async update(req, res) {
    const { question_id } = req.params;

    const question = await HelpOrders.findById(question_id);

    if (!question) {
      return res.status(400).json({ error: 'Question not found' });
    }

    const { question: student_question, student_id } = question;

    const student = await Student.findByPk(student_id);

    const answered_at_formatted = format(new Date(), "d 'de' MMMM 'de' yyyy", {
      locale: pt,
    });

    await question.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua dúvida foi respondida',
      template: 'answered',
      context: {
        student: student.name,
        answered_at: answered_at_formatted,
        question: student_question,
        answer: req.body.answer,
      },
    });

    return res.json({ message: 'Answer created succefuly' });
  }
}

export default new WebHelpOrdersController();
