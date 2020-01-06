require('dotenv/config');

export default {
  host: process.env.HOST,
  port: process.env.PORT,
  secure: process.env.SECURE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  default: {
    from: 'Gympoint <noreply@gympoint.com>',
  },
};
