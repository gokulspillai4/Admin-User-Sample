const { response } = require('express');
var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Login', "login-label":"Enter your credentials." });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Signup' });
});



router.get('/admin/login', function (req, res, next) {
  res.render('admin-login', { title: 'Admin Login' })
})

router.post('/submit', (req, res,) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      console.log(response.status)
      res.redirect('/home')
    }else{
      res.render('index',{"login-label":"Enter valid credentials",})
    }
  })
})

router.post('/submit-reg', (req, res, next) => {
  userHelpers.doSignup(req.body).then((response) => {
    if (response.status) {
      
      res.redirect('')
    }else{
      
    }

  })
})


module.exports = router;
