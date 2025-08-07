const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const CustomError = require('../utils/CustomError');
const catchAsync = require('../utils/catchAsync');
const { populate } = require('../db/populatedb');
const { validationResult } = require('express-validator');

const allMessagesGet = catchAsync(async (req, res, next) => {
  const messages = await db.getAllMessages();
  if (!messages) {
    throw new CustomError('No messages found', 404);
  }
  return res.render('index', { title: 'Friends', messages });
});

// register user
const signUpGet = (req, res) => {
  res.render('sign-up', { title: 'Sign Up' });
};

const signUpPost = catchAsync(async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('sign-up', {
      title: 'Create user',
      errors: errors.array(),
    });
  }
  const { username, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.insertNewUser(
    username,
    hashedPassword,
    firstName,
    lastName,
  );
  if (!newUser) {
    throw new CustomError("Something went wrong: the user isn't created", 400);
  }
  res.redirect('/log-in');
});

// log in, logout
const logInGet = (req, res) => {
  const failed = 'fail' in req.query;
  res.render('log-in', { title: 'Log in', failed: failed });
};

const logInPost = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in?fail',
  })(req, res, next);
};

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
};

// change user status: member, admin
const changeStatusGet = (req, res) => {
  const showSuccess = 'success' in req.query;
  const showFail = 'wrongcode' in req.query;
  res.render('status', { title: 'Change Status', showFail, showSuccess });
};

const changeStatusPost = catchAsync(async (req, res) => {
  const user = req.user;
  const code = req.body.admin_code;
  const memberCheckboxChecked = req.body.memberCheckbox === 'yes';
  const adminCheckboxChecked = req.body.adminCheckbox === 'yes';

  if (memberCheckboxChecked && !user.is_member) {
    const updatedMembership = await db.addMemberStatus(user.id);
    if (updatedMembership === 0)
      throw new CustomError('Failed to add member status', 500);
  } else if (!memberCheckboxChecked && user.is_member) {
    const updatedMembership = await db.delMemberStatus(user.id);
    if (updatedMembership === 0)
      throw new CustomError('Failed to remove member status', 500);
  }

  if (code && code === process.env.ADMIN_CODE) {
    const updatedAdminStatus = await db.addAdminStatus(user.id);
    if (updatedAdminStatus === 0)
      throw new CustomError('Failed to grant admin status', 500);
  } else if (code) {
    return res.redirect('status?wrongcode');
  }

  if (!adminCheckboxChecked && user.is_admin) {
    const updatedAdminStatus = await db.delAdminStatus(user.id);
    if (updatedAdminStatus === 0)
      throw new CustomError('Failed to remove admin status', 500);
  }

  res.redirect('/status?success');
});

// message add, delete
const newMessageGet = (req, res) => {
  res.render('new-message', { title: 'New Message' });
};

const newMessagePost = catchAsync(async (req, res) => {
  const id = req.user.id;
  const { title, message } = req.body;
  const newMessage = await db.insertMessage(id, title, message);
  if (!newMessage) throw new CustomError('Message could not be created', 400);
  res.redirect('/');
});

const deleteMessagePost = catchAsync(async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).send('Access denied');
  }
  const message_id = req.body.messageToDelete;
  const deletedMessageCount = await db.deleteMessage(message_id);
  if (deletedMessageCount === 0) {
    throw new CustomError('Message not found or already deleted', 404);
  }
  return res.redirect('/');
});

// reset db to default state
const resetDb = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie('connect.sid');
      });
    });
  }
  await populate();
  res.redirect('/');
});

module.exports = {
  allMessagesGet,
  signUpGet,
  signUpPost,
  logInGet,
  logInPost,
  logOut,
  changeStatusGet,
  changeStatusPost,
  newMessageGet,
  newMessagePost,
  deleteMessagePost,
  resetDb,
};
