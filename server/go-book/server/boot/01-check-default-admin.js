'use strict';

const modelUtils = {
  find: (model, filters) => {
    return new Promise((resolve, reject) => {
      model.find(filters, (err, modelInstancesList) => {
        if (!err) {
          resolve(modelInstancesList);
        } else {
          reject(err);
        }
      });
    });
  },
  create: (model, parms) => {
    return new Promise((resolve, reject) => {
      model.create(parms, (err, model) => {
        if (!err) {
          resolve(model);
        } else {
          reject(err);
        }
      });
    });
  },
};

module.exports = function(app, callback) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  console.log('=== BEGIN check-default-admin ===');
  
  const User = app.models.User;

  modelUtils
    .find(User, { where: { id: 1 } })
    .then((users) => {
      if (!users || users.length === 0) {
        console.log('No built-in admin user found, creating...');
        return modelUtils.create(User, { email: 'admin@example.com', password: 'password' });
      } else {
        console.log('Built-in admin user found, using the admin user...', users);
        return Promise.resolve(users[0]);
      }
    })
    .then((user) => {
      console.log('Done: ', user);
      callback();
    });
};
