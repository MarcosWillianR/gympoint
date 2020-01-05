import HelpOrders from '../schemas/HelpOrders';
import Student from '../models/Student';

class MobileHelpOrdersController {
  async index(req, res) {
    const { student_id } = req.params;

    const data = await HelpOrders.find({ student_id });

    return res.json(data);
  }

  async show(req, res) {
    const { question_id } = req.params;

    try {
      const question = await HelpOrders.findById(question_id);

      return res.json(question);
    } catch (err) {
      return res.status(400).json({ error: 'Question not found' });
    }
  }

  async store(req, res) {
    const { student_id } = req.params;

    const { name: student_name } = await Student.findByPk(student_id);

    const answer = await HelpOrders.create({
      student_id,
      student_name,
      question: req.body.question,
    });

    return res.json(answer);
  }
}

export default new MobileHelpOrdersController();
