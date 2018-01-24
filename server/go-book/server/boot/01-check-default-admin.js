'use strict';

module.exports = async (app) => {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  console.log('=== BEGIN check-default-admin ===');
  
  const AppUser = app.models.AppUser;

  let user = await AppUser.findOne({ where: { id: 1 } });
  if (!user) {
    console.log('No built-in admin user found, creating...');
    user = await AppUser.create({ email: 'admin@example.com', password: 'password' }); 
    console.log('User has been created successfully: ', user);
  } else {
    console.log('Built-in admin user found, using the admin user: ', user);
  }

  console.log('=== END check-default-admin ===');
};

