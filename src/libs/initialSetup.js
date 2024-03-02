import Role from "../schema/user/Role.js";
import Auth from "../schema/auth/auth.js";

import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_ROLES} from "../config.js";


export const createRoles = async () => {
  try {
    //counts the documents in the role collection
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "admin" }).save(),
      new Role({ name: "user" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};

createRoles();

// check for an existing admin user
export const createAdmin = async () => {
  const userFound = await Auth.findOne({ email: ADMIN_EMAIL });
  console.log(userFound);
  if (userFound) return;

  // create a new admin user
  const newUser = await Auth.create({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: ADMIN_ROLES,
  });

  console.log(`new user created: ${newUser.email}`);
};

createAdmin();
