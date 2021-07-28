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

    // get info from params
    let name = req.query.name
    let email = req.query.email
    let offendername = req.query.offendername
    let incidentdescription = req.query.incidentdescription

    // create a new array with the info
    let newEntryArray = [name, email, offendername, incidentdescription]
    context.log(newEntryArray)

    let newMessage = {
        message : newEntryArray
        }
    context.log(newMessage)
    //context.log("newMessage: " + newMessage) // TESTING

    let items = await createDocument(newMessage);
    let [num_matches, map] = await findMatches(items, offendername)

    const responseMessage = `Thank you, ${items[items.length-1].message[0]}. We found ${num_matches} matches` // 6 was random_value
    
    context.res = {
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

  async function createDocument(newItem){
    const { endpoint, key, databaseId, containerId } = config;

    const client = new CosmosClient({ endpoint, key });
    
    const database = client.database(databaseId);
    const container = database.container(containerId);
    
    // Make sure Tasks database is already setup. If not, create it.
    await create(client, databaseId, containerId);
    const querySpec = {
        query: "SELECT * from c" //SELECT * from c   SELECT top 1 * FROM c order by c._ts desc
      };


    //   // read all items in the Items container
    // const { resources: items } = await container.items
    // .query(querySpec)
    // .fetchAll();

    const {resource: createdItem} = await container.items.create(newItem);

      // read all items in the Items container
      const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    return items

  }

    // notes:
    // - how do i get the number of entrys in the storage account? need this for looping through