'use strict';

module.exports = async (app) => {
  console.log('=== BEGIN db ===');
  console.log('Performing auto-migrate...');

  const ds = app.dataSources.pg;
  const excludedModels = ['User'];

  const modelsToMigrate = Object
    .keys(app.models)
    .filter((model) => (excludedModels.findIndex((m) => (m === model)) === -1))

  console.log('To migrate: ', modelsToMigrate);

  await ds.automigrate(modelsToMigrate);

  console.log('Done auto-migrate.');
  console.log('=== END db ===');
};

