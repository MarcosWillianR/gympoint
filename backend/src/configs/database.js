require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.HOST,
  username: process.env.NAME,
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
