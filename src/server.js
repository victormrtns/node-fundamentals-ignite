//Import patterns -> CommonJS
// const http = require('http')
//EsModules -> import export
import http from 'node:http'

//Req from my request object
//Stateful - Stateless (Data in memory, Data inside databases,text,etc )
const users = []
const server = http.createServer((req,res)=>{
  const {method,url} = req
  if(method === 'GET' && url==='/users'){
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if(method === 'POST' && url==='/users'){
    users.push({
      id:1,
      name:'John Doe',
      email:'john@example.com'
    })
    return res.writeHead(201).end()
  }
  return res.writeHead(404).end('Process not found')
})
server.listen(3333)