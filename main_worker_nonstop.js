document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault()
  // Membuat instance dari Worker dengan memberikan file worker.js
  const myWorker = new Worker('worker_nonstop.js');
  const myWorker2 = new Worker('worker2_nonstop.js');
  const text = document.getElementById('text').value
  const panjang = text.length
  const isi = {text : text, panjang}

  myWorker.postMessage(isi);

  // Mendengarkan pesan dari worker
  myWorker.onmessage = function(event) {
    const data = event.data
    if(data.status == "found"){
      myWorker2.terminate()
      document.getElementById('pesan1').innerText = `Hash Found !  Value : ${data.value}, hash : ${data.hash}`
      document.getElementById('pesan2').innerText = `Hash Found !  Value : ${data.value}, hash : ${data.hash}`
      myWorker.terminate()
    }else if(data.status === "max"){ //jika maxx
      document.getElementById('pesan1').innerText = `pass`
      myWorker.terminate()
    }else{
      document.getElementById('pesan1').innerText = `Generating 1 : Value : ${data.value}, hash : ${data.hash}`
    }
  };

  // Menangani kesalahan dari worker
  myWorker.onerror = function(event) {
    console.error('Error dari worker:', event.message);
  };

  //worker 2

  myWorker2.postMessage(isi);

  // Mendengarkan pesan dari worker
  myWorker2.onmessage = function(event) {
    const data = event.data
    if(data.status == "found"){
      myWorker.terminate()
      document.getElementById('pesan2').innerText = `Hash Found !  Value : ${data.value}, hash : ${data.hash}`
      document.getElementById('pesan1').innerText = `Hash Found !  Value : ${data.value}, hash : ${data.hash}`
      myWorker2.terminate()
    }else if(data.status === "max"){ //jika max
      document.getElementById('pesan2').innerText = `pass`
      myWorker2.terminate()
    }else{
      document.getElementById('pesan2').innerText = `Generating 2 : Value : ${data.value}, hash : ${data.hash}`
    }
  };

  // Menangani kesalahan dari worker
  myWorker2.onerror = function(event) {
    console.error('Error dari worker:', event.message);
  };

})