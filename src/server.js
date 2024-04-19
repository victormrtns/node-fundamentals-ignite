//Import patterns -> CommonJS
// const http = require('http')
//EsModules -> import export
import http from 'node:http'

//Req from my request object
//Stateful - Stateless (Data in memory, Data inside databases,text,etc )
const users = []
const server = http.createServer(async (req,res)=>{
  const {method,url} = req
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try{
    req.body = JSON.parse(Buffer.concat(buffers).toString()) 
  }catch{
    req.body = null
  }

  if(method === 'GET' && url==='/users'){
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }
  const {name,email} = req.body

  if(method === 'POST' && url==='/users'){
    users.push({
      id:1,
      name,
      email
    })
    return res.writeHead(201).end()
  }
  return res.writeHead(404).end('Process not found')
})
server.listen(3333)