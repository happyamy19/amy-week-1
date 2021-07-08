const querystring = require('querystring');

module.exports = async function (context, req) {
    //user messaged num, message is returned as req.body
    context.log(req.body);


    const queryObject = querystring.parse(req.body);
    const url = queryObject.MediaUrl0;



    context.res = {
        // status: 200, /* Defaults to 200 */
        body: url
    };
}
//number: +18434179543