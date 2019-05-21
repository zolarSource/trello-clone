const { MongoClient, ObjectID} = require('mongodb');
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'trello-clone-db';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    // handle error
    if(error) return console.log('unable to connect to the server');


    // creating database
    const db = client.db(databaseName);
});