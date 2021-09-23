var express = require('express');
const { resolve } = require('promise');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');


router.get('/', (req, res, next) => {
  userHelpers.getAllUsers().then((users) => {

    res.render('admin', { title: "Admin Dashboard", users: users })
  })

})
router.get('/login', (req, res, next) => {
  res.render('admin-login', { title: "Admin Login" })

})

router.get('/logout', (req, res, next) => {
  res.redirect('/admin/login')
})

router.get('/add-user', (req, res) => {
  res.render('add-user')
})

router.post('/add-user', (req, res) => {

  userHelpers.addUser(req.body).then((response) => {
    if (response.status) {
      res.render('add-user', { title: "Signup", "err-label": "Email already exists!", err: true })

    } else {
      res.redirect('/admin/')
    }

  })


})

router.get('/remove-user/', (req, res) => {
  let userId = req.query.id
  userHelpers.removeUser(userId)
  res.redirect('/admin/')
})


router.get('/edit-user/', async (req, res) => {
  // console.log(req.query.id);
  let user=await userHelpers.getUserDetails(req.query.id)
  // console.log(user);
  res.render('edit-user',{user})
})

router.post('/edit-user', (req, res) => {

  userHelpers.editUser(req.body).then((response) => {
    if (response.status) {
      res.render('add-user', { title: "Signup", "err-label": "Email already exists!", err: true })

    } else {
      res.redirect('/admin/')
    }

  })


})



module.exports = router;