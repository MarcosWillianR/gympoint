import { startOfWeek, endOfWeek } from 'date-fns';
import CheckIns from '../schemas/CheckIns';
import { pt_br } from '../../utils/validations';

const defaultMessages = pt_br.check_ins;

class MobileCheckInsController {
  async index(req, res) {
    const { student_id } = req.params;

    const checkins = await CheckIns.find({ student_id });

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;

    const actualDate = new Date();

    const startWeek = startOfWeek(actualDate);
    const endWeek = endOfWeek(actualDate);

    const checkins = await CheckIns.find({
      student_id,
      createdAt: {
        $gte: startWeek,
        $lte: endWeek,
      },
    });

    if (checkins.length >= 5) {
      return res.status(400).json({ error: defaultMessages.max_reached });
    }

    const checkin = await CheckIns.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new MobileCheckInsController();
