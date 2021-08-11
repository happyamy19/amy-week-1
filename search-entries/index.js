
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
    console.log('JavaScript HTTP trigger function processed a request.');
    
    let offendername = req.query.offendername
    let items = await getitems()

    let matches= await findMatches(items, offendername)

    responseMessage = `We found ${matches.length} matches ${JSON.stringify(matches)}`

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

async function findMatches(items, offendername){
    var matches = []
    console.log("about to begin searching")

    for (let i = 0; i < items.length; i++) {
        console.log("searching... " + i)
        if (items[i].message[2] ==  offendername){
          matches.push(items[i])
        }
    }
    return matches
}
async function create(client, databaseId, containerId) {
    const partitionKey = config.partitionKey;
  
    /**
     * Create the database if it does not exist
     */
    const { database } = await client.databases.createIfNotExists({
      id: databaseId
    });
    console.log(`Created database:\n${database.id}\n`);
  
    /**
     * Create the container if it does not exist
     */
    const { container } = await client
      .database(databaseId)
      .containers.createIfNotExists(
        { id: containerId, partitionKey },
        { offerThroughput: 400 }
      );
  
    console.log(`Created container:\n${container.id}\n`);
  }

  async function getitems(){
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);
    
    // Make sure database is already setup. If not, create it.
    await create(client, databaseId, containerId);
    const querySpec = {
        query: "SELECT * from c" //SELECT * from c   SELECT top 1 * FROM c order by c._ts desc
      };

      // read all items in the Items container
      const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    return items
  }
