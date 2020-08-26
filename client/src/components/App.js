import React, {useEffect, useState} from 'react';
import '.././styling/App.css';
import Ticket from './Ticket';
import axios from 'axios';
import Search from './Search';
function App() {
  const [tickets, setTickets] = useState([]);
  const [counter, setCounter] = useState(0);
  const [numOfTickets, setNumOfTickets] = useState(0);
  const hideTheTicket = (hideTarget) => {
    setCounter(counter + 1);
    const newArr = tickets.slice();
    newArr.forEach(i => {
      if(i.id === hideTarget){
        i.hidden = true;
        setTickets(newArr);
      }
    })
  }
  const filterBySearch = (searchInput) => {
    (async () => {
      try{
        setNumOfTickets(0);
        let countShowTicket = 0
        const { data } = await axios.get(`/api/tickets?searchText=${searchInput}`);
        data.forEach(i => countShowTicket++)
        setNumOfTickets(countShowTicket)
        setTickets(data);
      } catch(error) {
         alert(error);
      }
      })()
  }
  
  useEffect(()=>{
    (async () => {
      try{
        let countShowTicket = 0
        const { data } = await axios.get(`/api/tickets`);
        data.forEach(i => countShowTicket++)
        setNumOfTickets(countShowTicket)
        setTickets(data);
      } catch(error) {
        alert(error);
      }
    })()
  },[])
  const restoreHiddenTickets = () => {
    setCounter(0);
    filterBySearch('');
      }

  const filteredTicketList = tickets.filter(ticket => !ticket.hidden);
  return (
    <main>
      <header>
      <h1>My Ticket Manager</h1>
      </header>
      <div id="searchInput">
  <div className="hideTicketsCounter"> {numOfTickets} results {counter ? (<span>(Hidden tickets: {counter}<b> - </b>
        <button id="restoreHideTickets" onClick={restoreHiddenTickets}>restore</button>)</span>): ''} </div>
        <Search onchange={filterBySearch}/>
      </div>
      {filteredTicketList.map(i => 
          <Ticket ticket={i} hideOnClick={hideTheTicket}/> 
        )}
    </main>
  );
}
export default App;
