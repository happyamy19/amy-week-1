function newEntry(){
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var offender = document.getElementById("offender").value
    var description = document.getElementById("description").value

    if (email != ' ' && offender != ''){
        try{
            const url = "https://amybitcamp.azurewebsites.net/api/upload-entry"
            const resp = await fetch(url,{
                method:'POST',
                headers:{
                    'name': name,
                    'email': email,
                    'offendername': offender,
                    'incidentdescription': description,
                }
            })
            console.log("POST request was made successfully")
        }
        catch(err){
            $('#output').text(err)
        }
    }

}

