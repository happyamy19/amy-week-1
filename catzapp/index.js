function y1k3s(){
    var name = document.getElementById("name").value
    let endpoint = "https://cataas.com/cat/cute/says/" + name
    if (name != ''){
        document.getElementById("image").src = endpoint
    }
}