//rafce
import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom';

const AddRoom = () => {

    //첫번째 변수로 초기화하고, 두번째 함수로 업데이트 한다. react hook 의 useState 사용
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    //이벤트가 일어나는 객체의 이름과 값을 받아서 newRoom 값의 객체와 값을 업데이트
    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }
        setNewRoom({ ...newRoom, [name]: value });
    };

    /*{ ...newRoom }은 newRoom 객체의 모든 속성을 복사한 새로운 객체를 생성히고, 
    photo라는 속성을 추가하거나 업데이트하여 selectedImage 값을 할당하여 업데이트
    URL.createObjectURL(selectedImage)는 브라우저에서 selectedImage 파일 객체를 가리키는 임시 URL을 생성합니다.
    setImagePreview 함수는 이미지 미리보기를 저장할 상태를 업데이트하여 <img> 태그의 src 속성에 사용되어 선택한 이미지를 미리보기에 표시
    */
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // 추가적인 로직 수행
        console.log('Form submitted!', newRoom);
        // 예를 들어, 서버에 방 정보를 전송할 수 있습니다.

        /* await 를 사용하여 addRomm이 끝날때까지 기다리고, 정상적인 경우 초기화 */
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            console.log("success", success)
            if (success !== undefined) {
                setSuccessMessage("New room was added to the database");
                setNewRoom({ photo: null, roomType: "", roomPrice: "" });
                setImagePreview("");
                setErrorMessage("");
                const fileInput = document.getElementById('photo');
                fileInput.value = ''; // value 속성 변경
            } else {
                setErrorMessage("Error adding room");
            }
        } catch (error) {
            setErrorMessage(error.errorMessage);
        }

        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000 )

    };

    return (
        <>
        <section className="container, mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add a new Room</h2>

                    {successMessage && (
                            <div className='alert alert-success fade show'>
                                {successMessage}
                            </div>
                    )}

                    {errorMessage && (
                        <div className='alert alert-danger fade show'> {errorMessage}</div>

                    )}

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="roomType" className='form-label'>
                                Room Type
                            </label>
                            <div>
                                <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="roomPrice" className='form-label'>
                                Room Price
                            </label>
                            <input
                                className='form-control'
                                required
                                id='roomPrice'
                                name='roomPrice'
                                type='number'
                                value={newRoom.roomPrice}
                                onChange={handleRoomInputChange}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="photo" className='form-label'>
                                Room Photo
                            </label>
                            <input
                                id='photo'
                                name='photo'
                                type='file'
                                className='form-control'
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt='Preview Room Photo'
                                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                                    className='mb-3'
                                />
                            )}
                        </div>

                        <div className='d-grid d-flex mt-2'>
                            <Link to={"/existing-rooms"} className='btn btn-outline-info'>
                                back 
                            </Link>
                            <button className='btn btn-outline-primary ml-5'>
                                Save Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    );
};

export default AddRoom;
