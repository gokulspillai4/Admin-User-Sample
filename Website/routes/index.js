const { response } = require('express');
var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  if(req.session.user){
    
    res.redirect('/home')
    
    
  }else
  
  res.render('index', { title: 'Login', err:req.session.err});
  req.session.err=null
});

router.get('/signup', function (req, res, next) {
  if(req.session.user){
    res.redirect('/home')
  }else{

  res.render('signup', { title: 'Signup' });
  }
});





router.post('/index', (req, res,) => {
  if(req.session.user){
    redirect('/home')
  }else{
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.user=response.user
      req.session.user=true
      
      res.redirect('/home')
    }else{
      req.session.err="Enter valid credentials!"
      res.redirect('/')
    }
  })}
})

router.post('/submit-reg', (req, res, next) => {
  if(req.session.user){
    res.redirect('/home')
  }else{
  userHelpers.doSignup(req.body).then((response) => {
    if (response.status) {
      res.render('signup',{title:"Signup","err-label":"Email already exists!",err:true})
    
    }else{
      req.session.user=true
      req.session.user=response.user
      res.redirect('/home')
    }
    
  })
}
})


module.exports = router;
