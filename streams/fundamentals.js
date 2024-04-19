import {Readable,Writable,Transform} from 'node:stream'

class OneHundredStream extends Readable{
  index = 1;
  _read(){
    const i = this.index ++;
    if(i>100){
      this.push(null);
    }
    else{
      const buf = Buffer.from(String(i));
      this.push(buf);
    }
  }
}

class TurnNegativeStream extends Transform{
  _transform(chunk,encoding,callback){
    const transformed = Number(chunk.toString()) * -1;
    callback(null,Buffer.from(String(transformed)));
  }

}

class MultiplyByTenStream extends Writable{
  // chunk is the return of my readble stream
  //encoding is how that chunk is encoded
  //callback is a function that is called when the chunk has been written
  _write(chunk,encoding,callback){
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

//Here we instantiate a readble stream and pipe/write a writeable stream
new OneHundredStream()
  .pipe(new TurnNegativeStream())
  .pipe(new MultiplyByTenStream())