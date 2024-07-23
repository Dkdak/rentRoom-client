import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192"
});


/**
 * 라우저의 저장소 기능 중 하나로, 사용자가 데이터를 브라우저에 영구적으로 저장할 수 있게 해줍니다. 
 * localStorage에 저장된 데이터는 브라우저를 닫거나 컴퓨터를 재부팅해도 유지됩니다.
 *  localStorage에서 저장된 token을 가져와서 HTTP 요청 헤더에 사용할 인증 정보를 반환
 */
export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
}


/* this function add room type */
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    try {
        const response = await api.post("/rooms/add/new-room", formData, {
            headers: getHeader() 
        });
        if (response.status === 201) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error adding room:", error);
        return false;
    }
}

/* this function get room type */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/room-types");
        // console.log("Response data:", response.data); // 서버에서 받은 데이터 출력
        // console.log("Response status:", response.status); // 상태 코드 출력
        return response.data;

    } catch (error) {
        console.error("Error fetching room types:", error);
        throw new Error("Error fetching room types");
    }
}


/* this function get all rooms */
export async function getAllRooms() {

    try {
        const result = await api.get("/rooms/all-rooms")
        // console.log("result data:", result.data); // 서버에서 받은 데이터 출력
        // console.log("result status:", result.status); // 상태 코드 출력

        return result.data;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw new Error("Error fetching rooms");
    }

}


/* delete a room by the id ($들어가면 ~위의 `를 사용해라 인식이 잘 안된다)*/
export async function deleteRoom(roomId) {
    try {
        console.log(`Deleting room with ID: ${roomId}`);
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader() 
        });
        console.log(`Result: ${result.data}`);
        return result.data;
    } catch (error) {
        console.error(`Error deleting room: ${error.message}`);
        throw new Error(`Error deleting room: ${error.message}`);
    }
}


/** update a room */
export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData, {
        headers: getHeader() 
    })
    return response;
}


/* get a room by id */
export async function getRoomById(roomId) {
    console.log(`getRoomById called with roomId: ${roomId}`); // roomId 로그

    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        console.log(`getRoomById response:`, result);
        return result.data;
    } catch (error) {
        console.error(`Error fetching room: ${error.message}`); // 에러 로그 추가
        throw new Error(`Error fetching room: ${error.message}`);
    }
}


/* new booking data */
export async function bookRoom(roomId, booking) {
    console.log(`bookRoom request:`, roomId, booking);

    try {
        const result = await api.post(`/bookings/room/${roomId}/booking`, booking, {
            headers: getHeader() 
        });
        return result.data;
    } catch (error) {
        if (error.response) {
            // 서버가 응답한 상태 코드가 있는 경우
            console.error(`Error bookRoom : ${error.response.data}`); // 서버에서 전달한 에러 메시지
            throw new Error(`Error bookRoom : ${error.response.data}`);
        } else if (error.request) {
            // 요청은 성공했지만 응답을 받지 못한 경우
            console.error(`Error bookRoom : No response received`);
            throw new Error(`Error bookRoom : No response received`);
        } else {
            // 요청을 설정하는 동안 문제가 발생한 경우
            console.error(`Error bookRoom message: ${error.message}`);
            throw new Error(`Error bookRoom : ${error.message}`);
        }

    }
}


/* all booking data */
export async function getAllBookings() {
    try {
        const result = await api.get(`/bookings/all-bookings`, {
            headers: getHeader() 
        });
        console.log(`getAllBookings response:`, result);
        return result.data;
    } catch (error) {
        console.error(`Error getAllBookings: ${error.message}`); // 에러 로그 추가
        throw new Error(`Error getAllBookings: ${error.message}`);
    }
}


/* get booking by the confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`, {
            headers: getHeader() 
        });
        console.log(`confirmationCode:`, result);
        return result.data;
    } catch (error) {
        if (error.response) {
            console.error(`Error response: ${error.response.status}, ${error.response.data}`);
            throw error; // axios 에러 객체를 그대로 던짐
        } else if (error.request) {
            console.error('Error request: No response received');
            throw new Error('No response received');
        } else {
            console.error(`Error message: ${error.message}`);
            throw new Error(error.message);
        }
    }
}


/* cancel booking */
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
            headers: getHeader() 
        });
        console.log(`delete:`, result);
        return result.data;
    } catch (error) {
        console.error(`Error delete: ${error.message}`); // 에러 로그 추가
        throw new Error(`Error delete: ${error.message}`);
    }
}


/** get all available rooms from the database  */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    console.log(`getAvailableRooms :`, checkInDate, checkOutDate, roomType);
    const result = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
    // console.log("Available status:", result.status); // 상태 코드 출력
    // console.log("Available result:", result.data); // 서버에서 받은 데이터 출력
    
    return result;
}


export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration);
        return response.data;

    } catch(error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`user registration error : ${error.message}`)
        }
    }
}


export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login);
        console.log(`loginUser:`, response);
        if(response.status >= 200 && response.status < 300) {
            return response.data;// { userId, email, token, roles }
        } else {
            return null;
        }
    } catch(error) {
        console.error(error);
        return null;
    }

}


export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data

    } catch(error) {
        throw error.message

    }
}


export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader() 
        })
        return response.data

    } catch(error) {
        throw error

    }
}


export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/booking`, {
            headers: getHeader() 
        })
        return response.data

    } catch(error) {
        console.error("Error fetching bookings:", error.message); // 에러 로그 추가
        throw new Error(`failed to fetch bookings: ${error.message}`);

    }
}