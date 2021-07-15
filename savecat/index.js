const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING_PP;
const { BlobServiceClient } = require("@azure/storage-blob");
const fetch = require('node-fetch')
const multipart = require('parse-multipart')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let resp1 = await fetch("https://cataas.com/cat/cute/says/Amy", {
        method: 'GET'
    });
    let cat = await resp1.arrayBuffer()
                // we need to receive it as a buffer since this is an image we are receiving from the API
                // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob
    //let base64data1 = Buffer.from(data1).toString('base64')

    var responseMessage = ""
    try {
        // var password = req.headers['codename']; // get the header called "codename"
        // var boundary = multipart.getBoundary(req.headers['content-type']);
        // var body = req.body;
        // var parsedBody = multipart.Parse(body, boundary);
        // //use parse-multipart to parse the body
        // var filetype = parsedBody[0].type;
        // var filetype = cat.type;
        // if (filetype == "image/png") {
        //     ext = "png";
        // } else if (filetype == "image/jpeg") {
        //     ext = "jpeg";
        // } else if (filetype == "image/jpg") {
        //     ext = "jpg"
        // } else {
        //     username = "invalidimage"
        //     ext = "";
        // }
        // //determine the file-type here!
        responseMessage = await uploadFile(cat, "jpeg", password);    // fill the parameters in!
    } catch(err) {
        context.log("Undefined body image");
        responseMessage = "Sorry! No image attached."
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}


async function uploadFile(parsedBody, ext, password){
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "cats";
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container

    const blobName = password + '.' + ext;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);

    return ("File Saved");
}