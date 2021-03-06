const express = require('express'),
path = require('path');
const http = require('http')
const app = express()
const port = 3000;
const fs = require('fs');


app.use(express.static(__dirname + '/public'));

var useragent = require('express-useragent');
var Fingerprint = require('express-fingerprint')

app.enable('trust proxy')
app.use(useragent.express());
app.use(Fingerprint({
    parameters:[
        // Defaults
        Fingerprint.useragent,
        Fingerprint.acceptHeaders,
        Fingerprint.geoip,
 
        // Additional parameters
        function(next) {
            // ...do something...
            next(null,{
            'param1':'value1'
            })
        },
        function(next) {
            // ...do something...
            next(null,{
            'param2':'value2'
            })
        },
    ]
}))

app.get('*',function(req,res,next) {    
      
    var newData = 
    new Date()+'\n'+
    JSON.stringify(req.useragent)+'\n'+
    JSON.stringify(req.fingerprint)+'\n'+
    getClientIp(req)+'\n';
    // fs.readFile('info/user-info.json',(err,oldData)=>{
    //     fs.writeFileSync('info/user-info.json',oldData+'\n'+newData)
    // })
    console.log(newData+'--------------------'+'\n')
    const img= fs.readFileSync('public/1.jpg')
    res.writeHead(200, {'Content-Type': 'image/gif' });
    res.end(img)
    
})

var getClientIp = function(req) {
    return (req.headers["X-Forwarded-For"] ||
            req.headers["x-forwarded-for"] ||
            '').split(',')[0] ||
           req.client.remoteAddress;
};

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Listening on port ${port}`)
})


