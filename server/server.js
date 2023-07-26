const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { chats } = require('./seeds/seed');

const PORT = process.env.PORT || 3001;
const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('API is running successfully')
});

app.get('/api/chat', (req, res) => {
    res.send(chats)
});

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}!`);
});