import Plan from '../models/Plan';
import Registration from '../models/Registration';
import { pt_br } from '../../utils/validations';

const defaultMessage = pt_br.plans;

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async show(req, res) {
    const { plan_id } = req.params;

    const plan = await Plan.findByPk(plan_id, {
      attributes: ['id', 'title', 'duration', 'price'],
    });

    if (!plan) {
      return res.status(400).json({ error: defaultMessage.not_exists });
    }

    return res.json(plan);
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
    const { plan_id } = req.params;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: defaultMessage.not_exists });
    }

    const { id, title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { plan_id } = req.params;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: defaultMessage.not_exists });
    }

    const planInUse = await Registration.findOne({
      where: {
        plan_id,
      },
    });

    if (planInUse) {
      return res.status(400).json({ error: defaultMessage.being_used });
    }

    await plan.destroy();

    return res.json({ message: defaultMessage.success_removed });
  }
}

export default new PlanController();
