import axiosClient from "./axiosClient";

const ReviewAPI = {
    create(data) {
        const url = '/api/review';
        return axiosClient.post(url, data);
    },
    getById(idsach) {
        const url = `/api/review/${idsach}`;
        return axiosClient.get(url);
    }
}

export default ReviewAPI;