const fs=require('fs');
const http=require('http');
const lodash=require('lodash');

const server=http.createServer((req,res)=>{

const num=lodash.random(0,20);

console.log(num);


  res.setHeader('Content-Type','text/html');

  let path='./views/'

  switch(req.url){
    case '/':
        res.statusCode=200;
        path +='index.html';
        break;
        
        case '/about':
            res.statusCode=200;
            path +='about.html';
            break;
            
        case '/about':
            res.statusCode=200;
            path +='about.html';
            break;

        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;

        default:
            res.statusCode=404;
            path +='404.html'
  }

  fs.readFile(path,(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        res.statusCode=200;
        res.end(data)
    }
  })


})

server.listen(2222,'localhost',()=>{
    console.log('head of the department');
})