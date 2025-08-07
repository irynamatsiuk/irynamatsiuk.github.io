const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');
const { ensureAuthenticated } = require('../middleware/auth');
const { validateUser } = require('../validations/userValidation');

// register
router.get('/sign-up', controller.signUpGet);
router.post('/sign-up', validateUser, controller.signUpPost);

// log in, logout
router.get('/log-in', controller.logInGet);
router.post('/log-in', controller.logInPost);
router.get('/log-out', controller.logOut);

// change status (admin, member)
router.get('/status', ensureAuthenticated, controller.changeStatusGet);
router.post('/status', ensureAuthenticated, controller.changeStatusPost);

// messages
router.get('/new', ensureAuthenticated, controller.newMessageGet);
router.post('/new', ensureAuthenticated, controller.newMessagePost);
router.post('/delete', ensureAuthenticated, controller.deleteMessagePost);

// reset DB
// for demonstration purposes of the project it's not secured properly
router.post('/reset-db', controller.resetDb);

// index / home
router.get('/', controller.allMessagesGet);

module.exports = router;
