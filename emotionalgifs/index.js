//help me please
var multipart = require('parse-multipart');
var fetch = require('node-fetch');

module.exports = async function (context, req) {
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body
    var parts = multipart.Parse(body, boundary);
    var image = parts[0].data
    var result = analyzeImage(image)
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {result}
    };
}

    async function analyzeImage(img){
    
        const subscriptionKey = process.env.FACEAPI_KEY1;
        const uriBase = process.env.FACEAPI_ENDPOINT + '/face/v1.0/detect';
        let params = new URLSearchParams({
            'returnFaceId': 'true',
            'returnFaceAttributes': 'emotion'
        })
        //COMPLETE THE CODE
        let resp = await fetch(uriBase + '?' + params.toString(), {
            method: 'POST',  //WHAT TYPE OF REQUEST?
            body: img,  //WHAT ARE WE SENDING TO THE API?
            headers: {
                'Content-Type': 'application/octet-stream', 
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        })
        let data = await resp.json();
        
        return data; 
    }