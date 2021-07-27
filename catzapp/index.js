function y1k3s(){
    var name1 = document.getElementById("name1").value
    let endpoint = "https://cataas.com/cat/cute/says/" + name1
    if (name1 != ''){
        document.getElementById("image1").src = endpoint
    }

    var name2 = document.getElementById("name2").value
    let endpoint2 = "https://cataas.com/cat/cute/says/" + name2
    if (name2 != ''){
        document.getElementById("image2").src = endpoint2
    }

    var name3 = document.getElementById("name3").value
    let endpoint3 = "https://cataas.com/cat/cute/says/" + name3
    if (name3 != ''){
        document.getElementById("image3").src = endpoint3
    }

    var name4 = document.getElementById("name4").value
    let endpoint4 = "https://cataas.com/cat/cute/says/" + name4
    if (name4 != ''){
        document.getElementById("image4").src = endpoint4
    }
}