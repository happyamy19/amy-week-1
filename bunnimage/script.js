function getImage(event){
    event.preventDefault()
    if (document.getElementById("name").value != ''){
        $('#output').text("Your image has been stored successfully!")
    }
    else{
        alert("No name error.")
    }
}