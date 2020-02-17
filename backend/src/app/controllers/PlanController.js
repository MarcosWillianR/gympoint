import Plan from '../models/Plan';
import Registration from '../models/Registration';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async show(req, res) {
    const { plan_id } = req.params;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Esse plano não existe.' });
    }

    const { id, title, duration, price } = plan;

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async store(req, res) {
    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Esse plano não existe.' });
    }

    const edittedPlan = await plan.update(req.body);

    return res.json(edittedPlan);
  }

  async delete(req, res) {
    const { plan_id } = req.params;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Esse plano não existe.' });
    }

    /**
     * Regra de negócio para verificar se o plano está em uso
     * (da erro na hora de deletar se não tiver essa verificação)
     */
    const planInUse = await Registration.findOne({
      where: {
        plan_id,
      },
    });

    if (planInUse) {
      return res.status(400).json({ error: 'This plan is already in use' });
    }

    await plan.destroy();

    return res.json({ message: 'Plano removido com sucesso!' });
  }
}

export default new PlanController();
