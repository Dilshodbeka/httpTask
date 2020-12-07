const uIdGenerator = require('node-unique-id-generator');

class Book {
    constructor(title= "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uIdGenerator.generateUniqueId()) {
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.id = id;
    }
}

class User {
    constructor(mail = "", id = uIdGenerator.generateUniqueId()) {
        this.mail = mail
        this.id = id;
    }
}


module.exports = {
    Book,
    User
};