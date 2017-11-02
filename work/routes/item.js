var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var connection=mysql.createPool({
	host	:'localhost',
	user	:'root',
	password:'182325',
	database:'11-2'
	
})
router.get('/title',function(req,res,next){
	connection.query('SELECT title,detail FROM work', function(err, rows, fields) {
    	res.header('Access-Control-Allow-Origin',"*")
        if (err) throw err;
        	res.send(rows);
   });
})
router.post('/tianjia',function(req,res,next){
	res.header('Access-Control-Allow-Origin',"*")
	var title=req.body.title;
	var detail=req.body.detail;
	console.log(title);
	console.log(detail)
	connection.query(`INSERT INTO work (title,detail) VALUES ('${title}','${detail}')`, function(err, rows, fields) {
	    console.log(1)
	    if (err) throw err;
	    if(rows!=""||rows!=null){
	    	console.log(title,detail);
	        connection.query("SELECT * FROM work",function(err,rows){
	        	res.send(rows)
	      	})
	    }
   });
})







module.exports = router;