const fetch = require('node-fetch')

// function generate_name(){
//     var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
//     var random_value = Math.floor(names.length * Math.random())
//     var resultname = names[random_value]
//     return resultname
// }


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('test');
    // let name1 = generate_name()
    // let name2 = generate_name()
    //get names from the query

    let name1 = req.query.name1
    let name2 = req.query.name2
    let name3 = req.query.name3
    let name4 = req.query.name4

    async function getCat(name){
        let endpoint = "https://cataas.com/cat/cute/says/" + name
        let resp = await fetch(endpoint, {
            method: 'GET'
        });
        let data = await resp.arrayBuffer()
                // we need to receive it as a buffer since this is an image we are receiving from the API
                // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob
        let base64data = Buffer.from(data).toString('base64')

        return base64data
    }

    let cat1 = await getCat(name1)
    let cat2 = await getCat(name2)
    let cat3 = await getCat(name3)
    let cat4 = await getCat(name4)
    

//put what you want to turn into base64 inside "originaldata"
//"originaldata" will be encoded in base64.

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: cat1,
            cat2: cat2,
            cat3: cat3,
            cat4: cat4
        }
    };
}