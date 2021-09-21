var express = require('express');
const session = require('express-session');
var router = express.Router();

/* GET home page. */
let products = [
  {
    model: "OnePlus Nord CE 5G", 
    availability: "In stock", 
    price: "$399.00", 
    image: "https://m.media-amazon.com/images/I/61iy2Ru9KdS._SL1500_.jpg"
  },
  {
    model: "Nokia 5.4", 
    availability: "In stock", 
    price: "$99.00", image: "https://m.media-amazon.com/images/I/71fqEnuWn2L._SL1500_.jpg"
  },
  {
    model: "iPhone 11",
    availability: "In stock",
    price: "$599.00",
    image: "https://m.media-amazon.com/images/I/61iy2Ru9KdS._SL1500_.jpg"
  },
  {
    model: "Redmi Note 10S", 
    availability: "In stock", 
    price: "$259.00",
    image: "https://m.media-amazon.com/images/I/71fqEnuWn2L._SL1500_.jpg"
  }
 
  
]


router.get('/', function (req, res) {
  if(req.session.loggedIn){
  var username=req.session.username;
  res.render('index', { products,username});
  }else{
    res.redirect('/')
  }

});

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect("/")
  req.session.loggedIn=false;
})







module.exports = router;
