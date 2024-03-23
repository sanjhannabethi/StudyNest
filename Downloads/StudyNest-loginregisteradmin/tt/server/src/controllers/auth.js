const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('select user_id, email from users')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.register = async (req, res) => {
  const { username, email, password, userType = 'Mentee'} = req.body; // Destructure data with default userType
  // console.log(req.body);
  try {
    const hashedPassword = await hash(password, 10);

    // Insert user data with username
    await db.query(
      'INSERT INTO users (username, email, password, user_type, created_at) VALUES ($1, $2, $3, $4, current_date)',
      [username, email, hashedPassword, userType]
    );

    return res.status(201).json({
      success: true,
      message: 'The registration was successful',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};


exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.user_id,
    email: user.email,
  }

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.getRole = async (req, res) => {
  try {
    // console.log(req.user);
    // Assuming the user's role is stored in a 'user_type' field in the users table
    const user_id = req.user.id; // Assuming user_id is available in the request object after authentication

    // Query the database to fetch the user's role
    const query = 'SELECT user_type FROM users WHERE user_id = $1';
    const { rows } = await db.query(query, [user_id]);

    if (rows.length === 0) {
      // If user not found, return a 404 response
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Extract the role from the database response
    const { user_type } = rows[0];
    // console.log(user_type);

    // Respond with the user's role
    res.status(200).json({ success: true, role: user_type });
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
