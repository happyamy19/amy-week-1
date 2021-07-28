const querystring = require('querystring');
const fetch = require('node-fetch'); // use to make requests 
const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.ENTRY_COSMOS_ENDPOINT,
    key: process.env.ENTRY_COSMOS_KEY,
    databaseId: "entriesdbid",
    containerId: "entriesdcid",
    partitionKey: {kind: "Hash", paths: ["/entries"]}
  }; 

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let offendername = req.query.offendername

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

async function findMatches(items, offendername){
    var num_matches = -1;
    const matchmap = new Map();
    var index = 0;

    for (let i = 0; i < items.length; i++) {
        if (items[i].message[2] ==  offendername){
            num_matches =  num_matches+1;
            matchmap.set(index, items[i]);
            index = index + 1
        }
    }
    return [num_matches, matchmap]
}