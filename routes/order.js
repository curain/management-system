var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";
var router = express.Router();

router.get('/',(req,res,next)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        dbo.collection("order"). find({}).toArray(function(err, dcs) { // 返回集合中所有数据
            if (err) throw err;
            let result={
                date:dcs.map(obj=>obj.date),
                money:dcs.map(obj=>obj.money),
                amount:dcs.map(obj=>obj.amount),
            }
            res.send(result);
            db.close();
        });
    });
})




module.exports = router;