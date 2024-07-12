import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192"
});

/* this function add room type */
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    try {
        const response = await api.post("/rooms/add/new-room", formData);
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

        console.log("Response data:", response.data); // 서버에서 받은 데이터 출력
        console.log("Response status:", response.status); // 상태 코드 출력

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

        console.log("result data:", result.data); // 서버에서 받은 데이터 출력
        console.log("result status:", result.status); // 상태 코드 출력

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
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
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
    const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response;
}

/* get a room by id */
export async function getRoomById(roomId) {
    console.log(`getRoomById called with roomId: ${roomId}`); // roomId 로그

    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        console.log(`API response:`, result); // API 응답 로그
        return result.data;
    } catch (error) {
        console.error(`Error fetching room: ${error.message}`); // 에러 로그 추가
        throw new Error(`Error fetching room: ${error.message}`);
    }
}


/* new booking data */
export async function bookRoom(roomId, booking) {
    try {

        console.log(`bookRoom request:`, booking); // API 응답 로그
        const result = await api.post(`/bookings/room/${roomId}/booking`, booking);
        return result.data;
    } catch (error) {
        if (error.response) {
            // 서버가 응답한 상태 코드가 있는 경우
            console.error(`Error bookRoom response: ${error.response.data}`); // 서버에서 전달한 에러 메시지
            throw new Error(`Error bookRoom response: ${error.response.data}`);
        } else if (error.request) {
            // 요청은 성공했지만 응답을 받지 못한 경우
            console.error(`Error bookRoom request : No response received`);
            throw new Error(`Error bookRoom request: No response received`);
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
        const result = await api.get(`/bookings/all-bookings`);
        console.log(`bookRoom response:`, result); // API 응답 로그
        return result.data;
    } catch (error) {
        console.error(`Error bookRoom: ${error.message}`); // 에러 로그 추가
        throw new Error(`Error bookRoom: ${error.message}`);
    }
}


/* get booking by the confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
        console.log(`bookRoom confirmationCode:`, result); // API 응답 로그
        return result.data;
    } catch (error) {
        console.error(`Error confirmationCode: ${error.message}`); // 에러 로그 추가
        throw new Error(`Error confirmationCode: ${error.message}`);
    }
}


/* cancel booking */
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
        console.log(`bookRoom delete:`, result); // API 응답 로그
        return result.data;
    } catch (error) {
        console.error(`Error delete: ${error.message}`); // 에러 로그 추가
        throw new Error(`Error delete: ${error.message}`);
    }
}