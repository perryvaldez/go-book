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
  
  const { AppUser, Role, RoleMapping } = app.models;

  let user = await AppUser.findOne({ where: { id: 1 } });
  if (!user) {
    console.log('No built-in admin user found.');

    console.log('* Creating super admin...');
    user = await AppUser.create({ email: 'admin@example.com', password: 'password' }); 

    console.log('* Creating super admin role...');
    const role = await Role.create({ name: 'superadmin' });

    console.log('* Creating role principal...');
    const principal = await role.principals.create({
      principalType: RoleMapping.USER,
      principalId: user.id,
    });

    console.log('Default admin created successfully: ');
    console.log('* user: ', user);
    console.log('* role: ', role);
    console.log('* principal: ', principal);

  } else {
    console.log('Built-in admin user found, using the admin user: ', user);
  }

  console.log('=== END check-default-admin ===');
};

