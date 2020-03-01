module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:jest/recommended'],
  plugins: ['prettier', 'jest'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off", // Todos os controllers/models etc... vão ser Classes, mas não vão usar o this diretamente.
    "no-param-reassign": "off", // Permite que receba um parâmetro e faça alterações, necessário por que o Sequelize manipula alguns dados assim.
    "camelcase": "off", // Vamos utilizar variavéis snake case (minha_Variavel) em alguns momentos.
    "no-unused-vars": ['error', { 'ArgsIgnorePattern': 'next' }], // Vamos ter que utilizar o parâmetro next as vezes, sem a necessidade de utilizá-lo (comum em middlewares)
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "import/prefer-default-export": "off",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error","import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    'no-underscore-dangle': ["error", { "allow": ["_id"] }]
  },
};
