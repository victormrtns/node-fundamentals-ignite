import http from 'node:http'
import {Transform} from 'node:stream'

//Instantiate a transform stream and calling them using the res req
class TurnNegativeStream extends Transform{
  _transform(chunk,encoding,callback){
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null,Buffer.from(String(transformed)));
  }

}

const server = http.createServer((req,res)=>{
  return req
  .pipe(new TurnNegativeStream())
  .pipe(res)
})
server.listen(3334)