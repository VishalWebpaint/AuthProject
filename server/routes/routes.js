const {Router} = require('express')
const signUp = require('../controllers/signUp')

const sendMail = require('../util/mail')
const authenticateToken = require('../middleware/authenticate')
const { login, update, deleteUser } = require('../controllers/userControllers')
const sendOTP = require('../controllers/OTP/send')
const router = Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post("/mail", authenticateToken, sendMail)
router.put('/update/:id', authenticateToken, update)   
router.delete("/delete/:id", authenticateToken, deleteUser)
router.post("/send", authenticateToken, sendOTP)

module.exports = router
