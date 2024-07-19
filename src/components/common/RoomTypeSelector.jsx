import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'
import { Form, InputGroup, Button } from 'react-bootstrap'

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypesInput(false)
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <Form.Group controlId="roomType">
                        <Form.Control
                            as="select"
                            name="roomType"
                            value={newRoom.roomType}
                            onChange={(e) => {
                                if (e.target.value === "Add New") {
                                    setShowNewRoomTypesInput(true)
                                } else {
                                    handleRoomInputChange(e)
                                }
                            }}
                        >
                            <option value="">Select a room type</option>
                            <option value="Add New">Add New</option>
                            {roomTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {showNewRoomTypeInput && (
                        <InputGroup className="mt-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter a new room type"
                                onChange={handleNewRoomTypeInputChange}
                            />
                            <Button variant="primary" onClick={handleAddNewRoomType}>
                                Add
                            </Button>
                        </InputGroup>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector
