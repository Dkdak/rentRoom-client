import React, { useState, useEffect } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditRoom = () => {


  //첫번째 변수로 초기화하고, 두번째 함수로 업데이트 한다. react hook 의 useState 사용
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSize, setImageSize] = useState('');
  const [imageType, setImageType] = useState('');
  const { roomId } = useParams()


  /**
   * { ...newRoom }은 newRoom 객체의 모든 속성을 복사한 새로운 객체를 생성히고, 
   * photo라는 속성을 추가하거나 업데이트하여 selectedImage 값을 할당하여 업데이트
   * URL.createObjectURL(selectedImage)는 브라우저에서 selectedImage 파일 객체를 가리키는 임시 URL을 생성합니다.
   * setImagePreview 함수는 이미지 미리보기를 저장할 상태를 업데이트하여 <img> 태그의 src 속성에 사용되어 선택한 이미지를 미리보기에 표시
   */
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setRoom({ ...room, photo: selectedImage });
      setImagePreview(reader.result);
      // setImagePreview(URL.createObjectURL(selectedImage));
    };

    if (selectedImage) {
      const img = new Image();
      img.onload = () => {
        setImageSize(`${img.width} x ${img.height}`);
      };
      img.src = URL.createObjectURL(selectedImage);
      setImageType(selectedImage.type);
    }

    reader.readAsDataURL(selectedImage);
  };


  const handleInputChange = (event) => {
    //이벤트가 발생한 입력 필드의 name과 value 속성을 추출합니다
    const { name, value } = event.target
    setRoom({ ...room, [name]: value })
  };

  
  /** 
   * useEffect 훅: 컴포넌트가 렌더링된 이후에 실행됩니다. roomId가 변경될 때마다 이 useEffect가 다시 실행됩니다.
   * fetchRoom 함수: 비동기 함수로, roomId를 이용해 방 데이터를 가져옵니다.
   * 의존성 배열 [roomId]: useEffect가 roomId의 변경을 감지하여 다시 실행되도록 합니다. 
   */
  useEffect(() => {
    console.log(`useParams returned roomId: ${roomId}`); // useParams가 반환한 roomId 로그

    const fetchRoom = async () => {
      try {
        console.log(`Fetching room with ID: ${roomId}`); // API 호출 전에 roomId 로그
        const roomData = await getRoomById(roomId)
        console.log(`Fetched room data:`, roomData);
        setRoom(roomData)
        

        if (roomData.photo) {
          const imageType = roomData.photo.split(';')[0].split(':')[1];
          setImageType(imageType);
          setImagePreview(`data:image/jpeg;base64,${roomData.photo}`);

          // Creating an Image object to find out the size of the base64 image
          const img = new Image();
          img.onload = () => {
            setImageSize(`${img.width} x ${img.height}`);
          };
          img.src = `data:image/jpeg;base64,${roomData.photo}`;
        }

      } catch (error) {
        console.error(error)
      }
    }
    if(roomId) {
      fetchRoom()
    }
  }, [roomId])
   

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await updateRoom(roomId, room);
      console.log("response", response);
      if (response.status === 200) {
        setSuccessMessage("Room updated successfully in the database");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        
        if (updatedRoomData.photo) {
          // 이미지를 받아오면 헤더 싸이즈때문에 base64로 변환하여야 함.
          setImagePreview(`data:image/jpeg;base64,${updatedRoomData.photo}`);

          const imageType = updatedRoomData.photo.split(';')[0].split(':')[1];
          setImageType(imageType);

          // Creating an Image object to find out the size of the base64 image
          const img = new Image();
          img.onload = () => {
            setImageSize(`${img.width} x ${img.height}`);
          };
          img.src = `data:image/jpeg;base64,${updatedRoomData.photo}`;
        }

        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000 )

  };

  return (
    <div className='container mt-5 mb-5'>
      <h3>Edit Room</h3>
      <div className='row justify-content-center'>
        <div className='col-md-8, col-lg-6'>
          {successMessage && (
            <div className='alert alert-success' role='alert'>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className='alert alert-danger' role='alert'>
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='roomType' className='form-label hotel-color'>
                Room Type
              </label>
              <input
                type='text'
                className='form-control'
                id='roomType'
                name='roomType'
                value={room.roomType}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='roomPrice' className='form-label hotel-color'>
                Room Price
              </label>
              <input
                type='text'
                className='form-control'
                id='roomPrice'
                name='roomPrice'
                value={room.roomPrice}
                onChange={handleInputChange}
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
                <>
                <img
                  src={imagePreview}
                  alt='Room Preview'
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className='mb-3'
                />
                <p>Type: {imageType}</p>
                <p>Size: {imageSize}</p>
                </>
              )}
            </div>
            <div className='d-grid gap-2 d-flex mt-2'>
              <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5'>
                back
              </Link>
              <button type='submit' className='btn btn-outline-warning ml-5'>
                Edit Room
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default EditRoom