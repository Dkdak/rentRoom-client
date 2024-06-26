import axios from "axios";

const BASE_URL = "http://localhost:9192"

export default {
    getArticle: function() {
        return axios.get(BASE_URL + "/rooms/room/room-types");
    }
}