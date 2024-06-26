//rafce
import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");


    //React의 useEffect 훅을 사용하여 컴포넌트가 마운트될 때 한 번만 실행되는 비동기 작업을 처리
    //getRoomTypes를 실행한 결과를 roomType에 Set
    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        });
    }, []);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    };

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypesInput(false);
        }
    };

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        id='roomType'
                        name='roomType' // 일관성 유지
                        value={newRoom.roomType} // 일관성 유지
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewRoomTypesInput(true);
                            } else {
                                handleRoomInputChange(e);
                            }
                        }}>
                        <option value={""}> Select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className='input-group'>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Enter a new room type'
                                onChange={handleNewRoomTypeInputChange}
                            />
                            <button className='btn btn-primary' type='button' onClick={handleAddNewRoomType}>
                                Add
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default RoomTypeSelector;
