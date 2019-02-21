const Sequelize = require('sequelize');
const config = require('config');
const fs = require('fs');
const path = require('path');
const associations = require('./associations');
const { sql } = require('../log');

const { Op } = Sequelize;

const dbOptions = config.get('app.db');

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $like: Op.like,
  $iLike: Op.iLike,
  $and: Op.and,
  $or: Op.or,
};

const options = Object.assign({}, dbOptions);
options.operatorsAliases = operatorsAliases;
options.logging = (_sql) => {
  /* istanbul ignore next */
  sql.info(_sql);
};
options.isolationLevel = Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ;

const sequelize = new Sequelize(options);
fs.readdirSync(path.join(__dirname, '..', 'models'))
  .filter(file => file.endsWith('.js'))
  .forEach((file) => {
    sequelize.import(path.join(__dirname, '..', 'models', file));
  });

const models = Object.keys(sequelize.models)
  .reduce((uppercaseModels, name) => {
    const ModelName = name.substring(0, 1).toUpperCase() + name.substring(1);
    uppercaseModels[ModelName] = sequelize.models[name];
    return uppercaseModels;
  }, {});

associations.init(models);
module.exports = models;
module.exports.sequelize = sequelize;
global.Promise = Sequelize.Promise;
