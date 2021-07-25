function getImage(event){
    event.preventDefault()

    var myform = document.getElementById("myform");
    let nameInput = document.getElementById("name")
    let fileInput = document.getElementById("image")
    var file = fileInput.files[0]; // fileInput is the file upload input element
    // get image uploaded, save in payload
    var payload = new FormData(myform);
    console.log(payload)
    payload.append("file", file);
    $('#output').text("Thanks!")

    console.log(payload)
    if (document.getElementById("name").value != ''){
        try{
            let url = "https://week-1.azurewebsites.net/api/bunnimage-upload"
             console.log("Image was uploaded, making POST req to azure func");
            // create request to azure function!
            const resp = fetch(url, {
                method: 'POST',
                headers: {
                    'codename': nameInput.value, // was username
                },
                body: payload
                })
            $('#output').text("Your image has been stored successfully!")
        } catch (err){
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
      let url = "https://week-1.azurewebsites.net/api/bunnimage-download"
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