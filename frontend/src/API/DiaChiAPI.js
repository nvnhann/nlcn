import axiosClient from "./axiosClient";

const DiaChiAPI = {
    create(data) {
        const url = "/api/diachi";
        return axiosClient.post(url, data);
    },
    get(){
        const url = "/api/diachi";
        return axiosClient.get(url);
    }
};

export default DiaChiAPI;