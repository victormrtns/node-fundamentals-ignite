//Import patterns -> CommonJS
// const http = require('http')
//EsModules -> import export
import http from 'node:http'

//Req from my request object
const server = http.createServer((req,res)=>{
  return res.end('Hello woralad')
})
server.listen(3333)