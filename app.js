const path=require("path");
const express = require("express");
const mysql=require("mysql");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const app=express();

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crudopetns'
});

connection.connect(function(error){
    if(!!error)
    console.log(error);
    else
    console.log("database connected");

});

app.set('views',path.join(__dirname,'views'));

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));




app.get('/',(req,res) => {
    // res.send("crud operations");
    let sql="SELECT * from details";
    let querry=connection.query(sql,(err,rows) => {
       
        if(err) throw err;
        res.render('user_index',{
            title:'CRUD OPERATIONS',
            details:rows

        });
        
    });
   
});

app.get('/add',(req,res) => {
    //    res.send("new user form page");
    res.render('user_add',{
        title:'CRUD OPERATIONS',

    });
});

app.post('/save',(req,res) => {
  let data={name: req.body.name, email:req.body.email, phone:req.body.phone};
  let sql="INSERT INTO DETAILS SET?";
  let querry=connection.query(sql,data,(err,results)=> {
      if(err) throw err;
      res.redirect('/');
  });
});

app.get('/edit/:detailid',(req,res) => {
         const detailid=req.params.detailid
         let sql='select * from details where id=?';
         
         let query=connection.query(sql,detailid,(err,result) => {
              if(err) throw err ;
              console.log(result)
              res.render("user_edit",{
                   title:"edit",
                   detail :result
              });
         });
});


app.post('/update',(req,res) => {

    console.log(req.body);
    //  console.log(req.params.id)
    console.log(req.body.name)
    let sql ='UPDATE details SET name=?,email=?,phone=? WHERE id=?';

    let querry=connection.query(sql,[req.body.name,req.body.email,req.body.phone,req.params.id],(err,results)=> {
        if(err) throw err;
        
        console.log("record upodated");
        res.redirect('/');
    });
  
  });

 app.get('/delete/:detailid',(req,res) => {
    const detailid=req.params.detailid
    let sql='delete  from details where id=?';
    
    let query=connection.query(sql,detailid,(err,result) => {
         if(err) throw err ;
         res.redirect('/');
    });
});
  


app.listen(3000,()=> {
    console.log("hi there");
});
