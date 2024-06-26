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
        // const response = await api.post("/rooms/add/new-room", formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // });

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

        console.log("result data:",result.data); // 서버에서 받은 데이터 출력
        console.log("result status:", result.status); // 상태 코드 출력

        return result.data;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw new Error("Error fetching rooms");
    }

}
