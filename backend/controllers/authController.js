const {insertUser, findUserByUsername} = require('../services/userService');

const createUser = async (req, res) => {
  const { email, username, password, roleId, status } = req.body;

  try {
    const user = await insertUser(email, username, password, roleId, status);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await findUserByUsername(username);
        
        if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await user.validPassword(password);
        

        if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }
    
 
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            roleId: user.roleId,
        };
        req.session.save();

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const checkAuth = async (req, res) => {
    if (req.session.user) {
        res.status(200).json({ user: req.session.user });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const logoutUser = async (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error logging out', err });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {
  createUser,
  loginUser,
  checkAuth,
  logoutUser
};

