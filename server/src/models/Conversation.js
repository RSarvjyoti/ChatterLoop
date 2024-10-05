const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
    sender : {type : Schema.ObjectId, required : true, ref : 'users'},
    receiver : {type : Schema.ObjectId, required : true,  ref : 'users'},
    messages : [{type : Schema.ObjectId, ref : 'message'}]
}, {
    timestamps : true
})

const Conversation = model("conversation", conversationSchema);

module.exports = Conversation;