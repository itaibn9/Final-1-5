import React, { useEffect, useState, useCallback } from 'react';
import '../styling/App.css';
import axios from 'axios';
import Ticket from './Ticket';
import Search from './Search';

function App() {
  const [tickets, setTickets] = useState([]);
  const [counter, setCounter] = useState(0);
  const [numOfTickets, setNumOfTickets] = useState(0);
  const [callrestore, setCallrestore] = useState(0);
  const [searchMethod, setSearchMethod] = useState("dsa");
  const onSearchMethodChange = useCallback(
    (event) => {
      console.log(event);
      setSearchMethod(event.target.value)
    },[])
  const hideTheTicket = useCallback(() => {
    console.log("rendered ticket");
    setCounter((prevCounter) => prevCounter + 1);
  }, []);
  const changeTheDate = useCallback((theDate) => {
    console.log("##########");
    const current = new Date(theDate);
    const timestring = `${current.getDay() + 1}/${current.getMonth() + 1}/${current.getFullYear()}
     ${current.toLocaleTimeString()}`;
    return timestring;
  },[]);
  
  const filterBySearch = async (title) => {
    try {
      if( searchMethod === "Title") {
        const data = await axios.get(`/api/tickets?searchText=${title}`) ;
        setTickets(data.data);
        setNumOfTickets(data.data.length);
      } else {
        const data = await axios.get(`/api/tickets/email?searchText=${title}`);
        setTickets(data.data);
        setNumOfTickets(data.data.length);
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/tickets');
        setNumOfTickets(data.length);
        setTickets(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const restoreHiddenTickets = () => {
    setCounter(0);
    setCallrestore(callrestore + 1);
  };
  return (
    <main>
      <header>
        <h1>My Ticket Manager</h1>
      </header>
      <div className="infoOnTickets">
        <div>
        <h3>
          {' '}
          {numOfTickets}
          {' '}
          results
          {' '}
          </h3>
          {counter > 0 ? (
            <i>
              (Hidden tickets:
              <span id="hideTicketsCounter">
                {counter}
              </span>
              <b> - </b>
              <button id="restoreHideTickets" onClick={restoreHiddenTickets}>restore</button>
              )
            </i>
          ) : ''}
          {' '}
          </div>
        <Search onchange={filterBySearch} onSearchMethodChange={onSearchMethodChange} />
      </div>
      <div className={'container'}>
      {tickets.map((i) => <Ticket ticket={i} changeTheDate={changeTheDate} hideOnClick={hideTheTicket} callRestore={callrestore} />)}
      </div>
    </main>
  );
}
export default App;
