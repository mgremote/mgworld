const { sequelize } = require('./src/server/db');

afterAll(() => sequelize.close());
