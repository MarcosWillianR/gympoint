require('../bootstrap');

module.exports = {
  dialect: process.env.APP_DB_DIALECT || 'postgres',
  host: process.env.APP_HOST,
  username: process.env.APP_USER,
  password: process.env.APP_PASS,
  database: process.env.APP_DATABASE,
  storage: './__tests__/database.sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
