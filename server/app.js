const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

//serve static build
app.use('/', express.static(path.join(__dirname, '../tic-tac/build')))
app.use(express.json());

//Read
app.get('/api/tickets', (req, res) => {
    const data = fs.readFileSync('./data.json');
    let tickets = JSON.parse(data);
    console.log(tickets.length);
    let searchText  = req.query.searchText;
    if(searchText) {
        const filteredTickets = tickets.filter(input => {
           return input.title.toLowerCase().includes(searchText.toLowerCase());
        })
        res.send((filteredTickets));
    } else {
        console.log(searchText);
        res.send((tickets));
    }
  });

//create


  app.post('api/tickets/${ticketId}/undone', (req, res) => {
    const data = fs.readFileSync('./records.json');
    let tickets = JSON.parse(data);
    tickets.find
    const newWinner = (req.body);
    records.push(newWinner);
    const info = JSON.stringify(records, null, 2);
    fs.writeFile('./records.json', info, () => console.log("file updated"));
    res.send(newWinner);
  })

module.exports = app;