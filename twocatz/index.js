const fetch = require('node-fetch')

function generate_name(){
    var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
    var random_value = Math.floor(names.length * Math.random())
    var resultname = names[random_value]
    return resultname
}


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let name1 = generate_name()
    let name2 = generate_name()
   
    // CAT IMAGE 1
    let resp1 = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {
        method: 'GET'
    });
    let data1 = await resp1.arrayBuffer()
                // we need to receive it as a buffer since this is an image we are receiving from the API
                // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob
    let base64data1 = Buffer.from(data1).toString('base64')

    // CAT IMAGE 2
    let resp2 = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {
        method: 'GET'
    });
    let data2 = await resp2.arrayBuffer()
                // we need to receive it as a buffer since this is an image we are receiving from the API
                // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob
    let base64data2 = Buffer.from(data2).toString('base64')
    

//put what you want to turn into base64 inside "originaldata"
//"originaldata" will be encoded in base64.

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: base64data1,
            cat2: base64data2,
            names: [name1, name2]
        }
    };
}