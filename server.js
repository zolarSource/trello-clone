const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

// const UserModel = require('./db/models/user');
const UserRouter = require('./db/routers/user');
// const BoardModel = require('./db/models/board');
const BoardRouter = require('./db/routers/board');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/public')));

mongoose.connect('mongodb://localhost:27017/trello-clone-db', {
    useNewUrlParser: true,
    useCreateIndex: true
});

app.get('*', (req, res) => {    
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.use(UserRouter);
app.use(BoardRouter);

app.listen(PORT, () => console.log(`server is starting on port ${PORT}`));