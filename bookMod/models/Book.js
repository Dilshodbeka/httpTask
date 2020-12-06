const uIdGenerator = require('node-unique-id-generator');

class Book {
    constructor(title= "", auther = "", desc = "", id = uIdGenerator.generateUniqueId()) {
        this.title = title;
        this.auther = auther;
        this.desc = desc;
        this.id = id;
    }
}


module.exports = Book;