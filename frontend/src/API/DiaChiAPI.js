import axiosClient from "./axiosClient";

const DiaChiAPI = {
    create(data) {
        const url = "/api/diachi";
        return axiosClient.post(url, data);
    },
    get(){
        const url = "/api/diachi";
        return axiosClient.get(url);
    },
    update(iddc,data){
        const url = `/api/diachi/${iddc}`;
        return axiosClient.put(url, data);
    },
    delete(iddc){
        const  url = `/api/diachi/${iddc}`;
        return axiosClient.delete(url);
    }
};

export default DiaChiAPI;