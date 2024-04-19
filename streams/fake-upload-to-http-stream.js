import {Readable} from 'node:stream'

class OneHundredStream extends Readable{
  index = 1;
  _read(){
    const i = this.index ++;
    setTimeout(() =>{
      if(i>3){
        this.push(null);
      }
      else{
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    },1000)
  }
}

//Here we instantiate a readble stream that is gonna be used inside my server
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneHundredStream(),
    duplex: 'half' // adicione essa linha
}).then(res => {
  return res.text()
}).then(data => {
  console.log(data)
})