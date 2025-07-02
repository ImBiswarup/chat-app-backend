const User = require('../models/users');

const userController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      const newUser = new User({ username, email, password });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  },

  login: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ $or: [{ username }, { email }] });

      if (user) {
        if (user.password !== password) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        return res.status(200).json({ message: 'Login successful', user });
      } else {
        const newUser = new User({ username, email, password });
        await newUser.save();

        return res.status(201).json({ message: 'User registered and logged in', user: newUser });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to authenticate user' });
    }
  },

  getUserDetails: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Failed to get user details' });
    }
  }
};

module.exports = userController;
