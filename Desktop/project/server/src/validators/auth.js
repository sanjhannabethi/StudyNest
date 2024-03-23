const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

//username validation
const username = check('username')
  .isLength({ min: 3, max: 20 })
  .withMessage('Username must be between 3 and 20 characters.')
  .exists() // Enforce username presence
  .custom(async (value) => {
    const { rows } = await db.query('SELECT * from users WHERE username = $1', [
      value,
    ])

    if (rows.length) {
      throw new Error('Username already exists.')
    }
  })


//password
const password = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Password has to be between 6 and 15 characters.')

//email
const email = check('email')
  .isEmail()
  .withMessage('Please provide a valid email.')

//check if email exists
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from users WHERE email = $1', [
    value,
  ])

  if (rows.length) {
    throw new Error('Email already exists.')
  }
})


// user type validation
const userType = check('userType')
  .isIn(['Mentee', 'Mentor', 'Admin']) // Allowed user types
  .withMessage('Invalid user type. Please choose Mentee, Mentor, or Admin.')

//login validation
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from users WHERE email = $1', [value])

  if (!user.rows.length) {
    throw new Error('Email does not exists.')
  }

  const validPassword = await compare(req.body.password, user.rows[0].password)

  if (!validPassword) {
    throw new Error('Wrong password')
  }

  req.user = user.rows[0]
})

// Registration validation with username, email, and unique username check
const registerValidation = [username, email, password, emailExists, userType]
const loginValidation= [loginFieldsCheck]
module.exports = {
  registerValidation,
  loginValidation,
}
