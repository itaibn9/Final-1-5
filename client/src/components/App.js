import React, {useEffect, useState} from 'react';
import '.././styling/App.css';
import Tickets from './Ticket';
function App() {
  return (
    <main>
      <title>Tickets Manager</title>
      <Tickets className='ticket'/>
    </main>
  );
}

export default App;
