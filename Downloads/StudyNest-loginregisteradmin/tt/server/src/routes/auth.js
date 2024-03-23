const { Router } = require('express')
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  getRole,
} = require('../controllers/auth')
const {
  getMentors, getMentees, createGroup, getGroups
} = require('../controllers/functions')
const {
  validationMiddleware,
} = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { userAuth } = require('../middlewares/auth-middleware')
const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)
router.get('/mentors', getMentors)
router.get('/mentees', getMentees)
router.post('/creategroup', createGroup)
router.get('/getgroups', getGroups)
router.get('/getrole',userAuth, getRole)

module.exports = router
