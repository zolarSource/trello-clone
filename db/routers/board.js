const express = require('express');
const Board = require('../models/board');
const Card = require('../models/card');
const Auth = require('../middleware/Auth');
const router = new express.Router();

router.post('/dashBoards/create', async (req, res) => {
    const board = new Board(req.body);

    try {
        await board.save().then(res => console.log(res)).catch(err => console.log(err));
        res.status(201).send(board);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/dashBoards/:id', async (req, res) => {
    try {
        const board = await Board.findByIdAndDelete(req.params.id);

        if(!board) return res.status(404).send();

        res.send(board);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post('/dashBoards', Auth, (req, res) => {
    Board.find({})
        .then((boards) => res.send(boards))
        .catch((e) => {
            res.status(500).send(e);
        });
});

router.post('/dashBoards/:title/cards', (req, res) => {
    Card.find({})
        .then((cards) => res.send(cards))
        .catch((e) => {
            res.status(500).send(e);
        });
});

router.post('/dashBoards/:title/cards/create', async (req, res) => {
    const card = new Card(req.body);

    try {
        await card.save().then(res => console.log(res)).catch(err => console.log(err));
        res.status(201).send(card);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/dashBoards/:title/cards/:id/create', async (req, res) => {
    const updates = Object.keys(req.body);
    
    try {
        const card = await Card.findById(req.params.id);

        updates.forEach((update) => {
            if(Array.isArray(req.body[update]) == true){
                card.items.push(req.body.items[0]);
            }
        });
        console.log(card);
        if(!card) return res.status(404).send();

        card.save().then(() => {
            res.status(201).send(card);
        });
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/dashBoards/:title/cards/:id/:cardItemId/remove', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        let items = [];
        
        card.items.map((item, i) => {
            if(req.params.cardItemId == card.items[i]._id){
                return false;
            }
            items.push(item)
        });
       
        card.items = items;

        if(!card) return res.status(404).send();

        card.save().then(() => {
            res.status(201).send(card);
        });
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;