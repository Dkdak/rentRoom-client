import React from 'react'
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { FaHome, FaDoorOpen, FaBed, FaBuilding, FaClipboardList } from 'react-icons/fa';

const Home = () => {

  const navigate = useNavigate();

  const goToExistingRooms = () => {
    navigate('/existing-rooms');
  };
  const goToAddRoom = () => {
    navigate('/add-rooms');
  };

  return (
    <div>
        <h2>Welcome home</h2>


        <tr>
        <button className='loginBtn' onClick={goToExistingRooms}>
        Existing Rooms <FaBed size={30} />
        
          {/* <Link to={"/existing-rooms"}>
              <FaHome size={30} />
              <FaDoorOpen size={30} />
              <FaBed size={30} />
              <FaBuilding size={30} />
              <FaClipboardList size={30} />
            </Link> */}
        </button>
        
        </tr>
        
        
        <tr>
        <button className='button' onClick={goToAddRoom}>
        AddRoom <FaClipboardList size={30} />
        </button>

        </tr>
        

    </div>
        
  )
}

export default Home