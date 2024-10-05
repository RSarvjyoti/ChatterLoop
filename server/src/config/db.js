const {connect} = require("mongoose") ;

const connectDb = async (url) => {
    try{
        await connect(url);
        console.log("database connected successfully!");
    }catch(err) {
        console.log(err);
    }
}
module.exports = connectDb