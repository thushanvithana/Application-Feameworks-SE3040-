const { rejects } = require('assert');
const fs = require('fs');
const http = require('http');
const https = require('https');
const { resolve } = require('path');

//write file 
fs.writeFile('file.txt', 'Hello world!', function(err){
    if(err)throw err;
    console.log('File saved!')
});

//read file
fs.readFile('file.txt', 'utf8', function(err, data){

    if(err)throw err;
    console.log(data);

});

//createe web server 
http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello world');
    res.end();
}).listen(8080);


//making http request
https.get('https://jsonplaceholder.typicode.com/posts/1', (resp)=>{
    let data ='';

    resp.on('data', (chunk)=>{
        data += chunk;
    });

    resp.on('end', ()=>{
        console.log(JSON.parse(data));
    });
}).on('error', (err)=>{
    console.log("Error: " + err.message);
})


//promises
const myPromise = new Promise((resolve, reject)=>{
    if(condition){
        resolve('Success');
    }else{
        reject('Failure');
    }
});

myPromise.then((result) => {
    console.log(result);
   }).catch((error) => {
    console.log(error);
   });


   //Async/Await

   async function myFunction() {
    try {
    const result = await myPromise;
    console.log(result);
    } catch (error) {
    console.log(error);
    }
   }
   myFunction();
   