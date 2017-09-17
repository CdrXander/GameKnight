/**
 * Created by Xander on 7/5/2017.
 */

module.exports = {
    handleGenericReturn:handleGenericReturn
};


function handleGenericReturn(method_name, result, httpResponse) {
    if(!err) {
        httpResponse.status(200).send(result);
    } else {
        console.log("Error in " + method_name);
        console.log(err);
        httpResponse.status(500).send(err);
    }
}
