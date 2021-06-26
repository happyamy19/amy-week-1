module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var password = req.query.password

    var repsonse;
    if (password == "letmein"){
        response = "Access Granted"
    }
    else{
        response = "Access Denied"
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };
}