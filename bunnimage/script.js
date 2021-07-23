function getImage(event){
    event.preventDefault()

    const bunniForm = document.getElementById("myform");
    let nameInput = document.getElementById("name")
    let image = document.getElementById("image")
    const file = image.files[0]; // fileInput is the file upload input element
    
    // get image uploaded, save in payload
    const payload = new FormData(bunniForm);
    payload.append("file", file);

    console.log(payload)
    if (document.getElementById("name").value != ''){

        try{
            let url = "https://week-1.azurewebsites.net/api/bunnimage-upload"
            $('#output').text("Thanks!")
             console.log("Image was uploaded, making post req to azure func");
            // create request to azure function!
            const resp = fetch(url, {
                method: 'POST',
                headers: {
                    'codename': username
                },
                body: payload
                });
        $('#output').text("Your image has been stored successfully!")
        
        } catch (err){
            $('#output').text(err)
        }
    }
    else{
        alert("No name error.")
    }
}