var express = require('express');
const { resolve } = require('promise');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');
let adminEmail="gokul@gmail.com"
let adminPassword=1234

router.get('/', (req, res, next) => {
  console.log(req.session.admin)
  if(req.session.admin){
  userHelpers.getAllUsers().then((users) => {
    res.render('admin', { title: "Admin Dashboard", users: users })
  })
}else{
  
  res.redirect('/admin/login')
}
})
router.post('/admin-login',(req,res)=>{

  
  if(req.body.email==adminEmail && req.body.password==adminPassword){
    let admin={adminLoggedIn:true}
    req.session.admin=admin
    
    res.redirect('/admin')

    
  }
  else{
    req.session.adminErr=true
   
    res.redirect('/admin/login')
  }
})

router.get('/login',(req, res, next) => {
  
  if(req.session.admin){
    res.redirect('/admin')
  }else{
    

  res.render('admin-login', { title: "Admin Login", err:req.session.adminErr })
  req.session.adminErr=false
  }
})

router.get('/logout', (req, res, next) => {
  req.session.admin=null
  res.redirect('/admin/login')
})

router.get('/add-user', (req, res) => {
  if(req.session.admin){
  res.render('add-user')}
  else{
    res.redirect('/admin/login')
  }
})

router.post('/add-user', (req, res) => {

  userHelpers.addUser(req.body).then((response) => {
    if (response.status) {
      res.render('add-user', { title: "Signup", "err-label": "Email already exists!", err: true })

    } else {
      res.redirect('/admin')
    }

  })


})

router.get('/remove-user/', (req, res) => {
  if(req.session.admin){
  let userId = req.query.id
  userHelpers.removeUser(userId)
  res.redirect('/admin')
  }else{
    res.redirect('/admin/login')
  }
})


router.get('/edit-user/:id', async (req, res) => {
  if(req.session.admin){
    console.log(req.query.id);
  let user=await userHelpers.getUserDetails(req.params.id)
  // console.log(user);
  res.render('edit-user',{user})
  }else{
      res.redirect('/admin/login')
    }
  
})

router.post('/edit-user/:id', (req, res) => {
  console.log(req.params.id);
  userHelpers.updateUser(req.params.id,req.body).then((response) => {
    if (response.status) {
      res.redirect('/admin?"status-label":"Userdata Updated!",status:true')
      // res.render('admin', { title: "Admin Dashboard", "status-label": "Userdata Updated!", status: true })

    } else {
      res.redirect('/admin')
    }

  })


})



module.exports = router;