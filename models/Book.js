const {Schema, model} = require('mongoose');

const bookSchema = new Schema ({
    title: {
        type: String, required: true
    },
    description: {
        type: String, default: ""
    },
    authors: {
        type: String, default: ""
    },
    favorite: {
        type: String, default: ""
    },
    //fileCover: {
    //    type: Boolean, default: false
    //},
    fileName: {
        type: String, default: ""
    },
    fileBook: {
        type: String, default: ""
    }
})


module.exports = model("Books", bookSchema);