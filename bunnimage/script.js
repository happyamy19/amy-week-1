async function getImage(event){
    event.preventDefault()
    var myform = document.getElementById("myform");
    let nameInput = document.getElementById("username");
    let fileInput = document.getElementById("image");
    let file = fileInput.files[0]
    var payload = new FormData(myform);
    console.log(payload);
    payload.append("file", file);
    $('#output').text("Thanks!")
    if(document.getElementById("username").value != ''){
        try{
            let url = "https://amybitcamp.azurewebsites.net/api/bunnimage-upload"
            console.log("Image was uploaded, making POST request to Azure function")
            //create request to Azure function
            const resp = await fetch(url,{
                method:'POST',
                headers:{
                    'codename': nameInput.value
                },
                body: payload
            })
            console.log("POST request was made successfully")
            $('#output').text("Your image has been stored successfully!")
        } catch(err){
            $('#output').text(err)
        }
    }
    else{
        alert("No name error.")
    }
}

async function downloadImage(){
  let username = document.getElementById("downloadusername").value
  if(username != ''){
    try{
      let url = "https://amybitcamp.azurewebsites.net/api/bunnimage-download"
      console.log("Got file name, making GET request")

      fetch (url, {
        headers:{
          username : username
        }
      })
      .then (resp => {
        return resp.json()
      })
      .then (data => {
        console.log(data.downloadUri)
      })

      //const resp = await fetch(url, {
      //  method: 'GET',
      //  headers: {
      //    'username': username
      //    }
      //  })
      //let data = await resp.json();
      //let imageUrl = data.downloadUri
      //window.open(imageUrl, "_self")
      //console.log("Made GET request successfully")
      //console.log(username)
    }
    catch(err){
      alert(err)
    }

  }
  else{
    alert("No name error!")
  }

}