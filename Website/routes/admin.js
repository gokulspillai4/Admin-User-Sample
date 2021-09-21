var express = require('express');
var router = express.Router();


router.get('/',(req,res,next)=>{
  res.render('admin',{title:"Admin Dashboard"})
})
router.get('/login',(req,res,next)=>{
  res.render('admin-login',{title:"Admin Login"})

})


  module.exports = router;