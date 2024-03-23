const express = require('express')
const app = express()
const db = require('./db')
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
const fs=require('fs')

//import passport middleware
require('./middlewares/passport-middleware')

// Function to execute SQL script
async function initDatabase() {
  const sql = fs.readFileSync('./database.sql', 'utf8');
  await db.query(sql);
}

//initialize middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize())

//import routes
const authRoutes = require('./routes/auth')
//initialize routes
app.use('/api', authRoutes)

//app start
const appStart = async() => {
  try {
    await initDatabase(); // Call initDatabase before starting server
  console.log('Database Connected');
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()
