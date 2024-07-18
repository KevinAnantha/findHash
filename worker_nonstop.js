async function generateSHA256Hash(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

self.onmessage = async function(event) {

  const data = event.data
  const text = data.text
  const panjang = data.panjang

  console.log(`Loading... data: ${text}, panjang : ${panjang}`)
  self.postMessage(`Generating...`);
  let lanjut = true
  for(let i = 1; i>=0; i+= 2){ //ganjil
    let hash = await generateSHA256Hash(i.toString())
    if(hash.slice(0, panjang) === text){ // jika berhasil menemukan
      self.postMessage({ value: i, status: 'found', hash: hash });
      lanjut = false
      break;
    }else if((i - 1) %1000 == 0){
      self.postMessage({ value: i, status: 'going', hash: hash });
    }
  }
};
  