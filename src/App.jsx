import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/css/bootstrap.css"
import AddRoom from './components/room/AddRoom';
import ExistingRooms from './components/room/ExistingRooms';

function App() {
  
  return (
    <>
      <AddRoom />
      <ExistingRooms />
    </>
  );
}

export default App;
