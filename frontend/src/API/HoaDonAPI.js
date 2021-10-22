import axiosClient from "./axiosClient";

const HoaDonAPI = {
    create(data) {
        const url = '/api/hoadon';
        return axiosClient.post(url, data);
    },
    get(){
        const url = '/api/hoadon';
        return axiosClient.get(url);
    }
}

export default  HoaDonAPI;