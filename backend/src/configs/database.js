require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.APP_HOST,
  username: process.env.APP_USER,
  password: process.env.APP_PASS,
  database: process.env.APP_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
