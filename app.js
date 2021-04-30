const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mysql=require('mysql');
const net=require('net');
//const client=require('socket.io-client');
const request=require('request')
var broker=require('./broker.js')
//const refresh=require('./public/js/refresh.js')
var mqtt=require('mqtt')
//const {Worker,isMainThread,parentPort,workerData} =require('worker_threads');
var client=mqtt.connect('ws://localhost:8000/');
var topic="723f942c-4e12-4c90-a97f-78fcf20b4cc4";
var message="haiii";


//const socket=client.connect("http://10.1.176.63:9898");

var month = new Array();
  month[0] = "jan";
  month[1] = "feb";
  month[2] = "mar";
  month[3] = "apr";
  month[4] = "may";
  month[5] = "jun";
  month[6] = "jul";
  month[7] = "aug";
  month[8] = "sep";
  month[9] = "oct";
  month[10] = "nov";
  month[11] = "dec";

  var d = new Date();
  var n = month[d.getMonth()];

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// socket.on("",(data)=>{
//     console.log(data);
// })

// const io=new net.Socket();
// io.connect(3000,"10.1.45.255")
//     let msg='';
//     io.on("data",(data)=>{
//         msg+=data;
//         console.log(msg);
//     });

    const connection=mysql.createConnection({
        host: '10.1.45.47',
        user:'root',
        password:'',
        database:'kelvin1'
    })
    connection.connect(function(err){
      if(err)
      {
          console.log("error")
    
      }
      else{
          console.log("Server Connection Established!!!")
      }
    });
const socket=net.createConnection({host:'10.1.45.207',port:9898},()=>{
    console.log("Socket Connected!!");
})
var msg=''

    
client.on('connect',()=>{
    socket.on("data",(data)=>{
        msg=data.toString()
        console.log(data.toString());
        client.publish(topic,message);
        console.log("message sent!!");
        
    
    })
        

})
// socket.on('error', function() {
//     id = socket.get(socket);

//     console.log('socket:timeout by id ' + id);
//     removeSocketFromMap(id,socket);
//     socket.destroy();
// })




app.get('/security',function(req,res){
    connection.query("SELECT * FROM employee where uid='"+msg+"'",function(err,rows,fields){
        if(err){
            res.send("error");
        }
        else{
            connection.query("SELECT `tempid`,`uid`,`temperature` FROM `temp_"+n+"` WHERE `uid`='"+msg+"' ORDER BY `tempid` DESC LIMIT 1",function(err,r,f){
                if(err){
                    res.render("index",{rows:rows})
                }
                else{
                    res.render("index",{rows:rows,temp:r});
                }
            })
           
            //res.send(rows);
        }
    })
})
app.get("/",function(req,res){
    res.render('login');
})
app.post("/login",function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    if(email=="lokesh@gmail.com"){
        if(password=="loki2105"){
            res.redirect('/security');
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect("/");
       
    }
})

    
    app.listen(3000);
// if(isMainThread){
    
//     const connection=mysql.createConnection({
//         host: 'localhost',
//         user:'root',
//         password:'',
//         database:'kelvin1'
//     })
//     connection.connect(function(err){
//       if(err)
//       {
//           console.log("error")
    
//       }
//       else{
//           console.log("Server Connection Established!!!")
//       }
//     });
//     const worker=new Worker(__filename);
//     worker.on('message',(msg)=>{console.log(msg);})
//     worker.on('error',(err)=>{console.log(err);})
//     app.get('/',function(req,res){
//         connection.query("SELECT * FROM employee where uid='"+msg+"' ",function(err,rows,fields){
//             if(err){
//                 res.send("error");
//             }
//             else{
//                 res.send(rows);
//             }
//         })
//     })
//     app.listen(3000);
// }
// else{

//         const socket=net.createConnection({host:'10.1.176.72',port:9898},()=>{
//             console.log("Socket Connected!!");
//         })
//         var msg=''
//         socket.on("data",(data)=>{
//             msg+=data
//             console.log(data.toString());
//             parentPort.postMessage(msg);
//         })
       

    
    

// }


    
    


   





