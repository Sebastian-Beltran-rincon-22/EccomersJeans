import Role from "../schema/Role.js";
import Auth from "../schema/auth.js";


//Create
export const createUser = async (req, res) => {
  try {
    const { name, username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new Auth({
      name,
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    user.password = await Auth.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      name: savedUser.name,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
}

//GetUsers
export const getUser = async (req,res) =>{
  try {
    const Users = await Auth.find({});
    return res.json(Users);
  }
  catch(error){
    return res.status(500),json({msg: error.message})
  }
}

//GetUserForId
export const getUserForId = async (req, res) =>{
  try {
    const { id } = req.params;
    const Users = await Auth.findById(id)
    res.status(200).json(Users);
  }
  catch (error){
    return res.status(500).json( {msg: error.message})
  }
}

//UpdateForId
export const updateUserForId = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, newPassword } = req.body;

    const existingUser = await Auth.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not Found" });
    }

    await Auth.findByIdAndUpdate(id, {
      name: name,
      username: username,
      userimg: userimg,
      email: email,

    });

    const updatedUser = await Auth.findById(id);
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
