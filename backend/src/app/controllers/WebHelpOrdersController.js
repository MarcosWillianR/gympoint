import HelpOrders from '../schemas/HelpOrders';

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

    await question.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    return res.json({ message: 'Answer created succefuly' });
  }
}

export default new WebHelpOrdersController();
