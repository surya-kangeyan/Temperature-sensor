var mosca=require('mosca');
var settings={http: {
    port: 8000,
    bundle: true,
    static: './'
  }}

var broker=new mosca.Server(settings);

broker.on('ready',()=>{
    console.log("Broker is ready");
})