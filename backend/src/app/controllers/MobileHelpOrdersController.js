import HelpOrders from '../schemas/HelpOrders';

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

    const answer = await HelpOrders.create({
      student_id,
      question: req.body.question,
    });

    return res.json(answer);
  }
}

export default new MobileHelpOrdersController();
