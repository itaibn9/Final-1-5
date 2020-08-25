const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

//serve static build
app.use('/', express.static(path.join(__dirname, '../tic-tac/build')))
app.use(express.json());

//Read
app.get('/api/tickets', (req, res) => {
    const data = fs.readFileSync('./data.json');
    let tickets = JSON.parse(data);
    let searchText  = req.query.searchText;
    if(searchText) {
        const filteredTickets = tickets.filter(input => {
           return input.title.toLowerCase().includes(searchText.toLowerCase());
        })
        res.send((filteredTickets));
    } else {
        res.send((tickets));
    }
  });

//create
app.post('/api/tickets/:ticketId/done', (req, res) => {
    const data = fs.readFileSync('./data.json');
    let tickets = JSON.parse(data);
    const foundTicket = tickets.findIndex(id => {
       return id.id === req.params.ticketId;
    })
    tickets[foundTicket].done = true;
    const info = JSON.stringify(tickets, null, 2);
    fs.writeFile('./data.json', info, () => console.log("file updated"));
    res.send(tickets[foundTicket]);
  })

app.post('/api/tickets/:ticketId/undone', (req, res) => {
  const data = fs.readFileSync('./data.json');
  let tickets = JSON.parse(data);
  const foundTicket = tickets.findIndex(id => {
     return id.id === req.params.ticketId;
  })
  tickets[foundTicket].done = false;
  const info = JSON.stringify(tickets, null, 2);
  fs.writeFile('./data.json', info, () => console.log("file updated"));
  res.send(tickets[foundTicket]);
})

module.exports = app;


