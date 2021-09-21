const { response } = require('express');
var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/home', (req, res, next) => {
  res.render('home');
})

router.get('/admin/login', function (req, res, next) {
  res.render('admin-login', { title: 'Admin Login' })
})

router.post('/submit', (req, res, next) => {
  console.log(req.body);
  next();
})

router.post('/submit-reg', (req, res, next) => {
  userHelpers.doSignup(req.body).then((response)=>{
  
  })
})


module.exports = router;
