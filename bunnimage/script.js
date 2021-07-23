function getImage(event){
    event.preventDefault()

    const myfrom = document.getElementById("myform");
    let nameInput = document.getElementById("name")
    let fileInput = document.getElementById("image")
    const file = fileInput.files[0]; // fileInput is the file upload input element
    
    // get image uploaded, save in payload
    const payload = new FormData(myform);
    payload.append("file", file);

    console.log(payload)
    if (document.getElementById("name").value != ''){
        try{
            let url = "https://week-1.azurewebsites.net/api/bunnimage-upload"
             console.log("Image was uploaded, making post req to azure func");
            // create request to azure function!
            const resp = fetch(url, {
                method: 'POST',
                headers: {
                    'codename': nameInput.value // was username
                },
                body: payload
                });
                console.log("post successful")
        $('#output').text("Your image has been stored successfully!")
        
        } catch (err){
            $('#output').text(err)
        }
    }
    else{
        alert("No name error.")
    }
}