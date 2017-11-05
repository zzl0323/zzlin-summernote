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
	connection.query('SELECT id,title,detail FROM work', function(err, rows, fields) {
    	res.header('Access-Control-Allow-Origin',"*")
        if (err) throw err;
        	res.send(rows);
   });
})

router.post('/delete',function(req,res,next){
	var abc=req.body.id;
	connection.query('DELETE FROM work WHERE id='+abc+' ',function(err, rows, fields) {
	    res.header('Access-Control-Allow-Origin',"*")
	    if (err) throw err;
	    res.send(rows);
	})
})

router.post('/tianjia',function(req,res,next){
	res.header('Access-Control-Allow-Origin',"*")
	var title=req.body.title;
	var detail=req.body.detail;
	connection.query(`INSERT INTO work (title,detail) VALUES ('${title}','${detail}')`, function(err, rows, fields) {
	    if(rows!=""||rows!=null){
	        connection.query("SELECT * FROM work",function(err,rows){
	        	res.send(rows)
	      	})
	    }
   });
})


router.post('/change',function(req,res,next){
	var id=req.body.id;
	var title=req.body.title;
	var detail=req.body.detail;
	connection.query(`UPDATE work SET title='${title}',detail='${detail}' WHERE id='${id}'`,function(err, rows, fields) {
	    res.header('Access-Control-Allow-Origin',"*")
	    if (err) throw err;
	    res.send(rows);
	})
})




module.exports = router;