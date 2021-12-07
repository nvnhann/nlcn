import axiosClient from "./axiosClient";

const HoaDonAPI = {
    create(data) {
        const url = '/api/hoadon';
        return axiosClient.post(url, data);
    },
    get(){
        const url = '/api/hoadon';
        return axiosClient.get(url);
    },
    huydon(idhd){
        const url = `/api/huydon/${idhd}`;
        return axiosClient.put(url);
    },
    getAll(f){
        const url = '/api/hoadon/getall';
        return axiosClient.get(url, {params: f});
    },
    xacnhan(idhd){
        const url = `/api/xacnhan/${idhd}`;
        return axiosClient.put(url);
    },
    xacnhanhuy(idhd){
        const url = `/api/xacnhanhuy/${idhd}`;
        return axiosClient.put(url);
    },
    thongke(){
        const url = '/api/thongke';
        return axiosClient.get(url);
    }
}

export default  HoaDonAPI;