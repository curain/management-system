var express = require('express');
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json()
const mongoose = require(`mongoose`);

var router = express.Router();

//连接数据库
mongoose.connect(`mongodb://localhost:27017/login`, {
  useMongoClient: true
})
//schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
});
// schema 编译成一个 Model
const user = mongoose.model(`users`, userSchema);


//登录   路由：'/login'
router.get(`/`, function (req, res, next) {
  res.render('login', {});
});
//接受json数据格式，查找数据库，返回结果
router.post(`/`, jsonParser, function (req, res, next) {
  let data = {
    username: req.body.username,
    password: req.body.password,
  }
  user.find((data),function(err,dcs){
    if(err) throw err;
    if(dcs.length>0){
      req.session.username = data.username;
      res.json({"code":0});
    }
    else{
      res.json({"code":1})
    };
  })



});
module.exports = router;