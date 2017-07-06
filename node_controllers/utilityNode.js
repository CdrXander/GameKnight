/**
 * Created by Xander on 7/5/2017.
 */

module.exports = {
    handleReturn:handleReturn
};


function handleReturn(method_name, err, result, res) {
    if(!err) {
        res.status(200).send(result);
    } else {
        console.log("Error in " + method_name);
        console.log(err);
        res.status(500).send(err);
    }
}
