var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', {title :`express`});
});
//登出
router.get(`/logout`,function(req,res,next){
   req.session.username = null;
   //console.log(`session`,req.session.username);
   res.redirect(`/login`);
})
module.exports = router;

