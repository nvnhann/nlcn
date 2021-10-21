import axiosClient from "./axiosClient";

const KhuyenMaiAPI = {
    get(){
        const url = '/api/khuyenmai';
        return axiosClient.get(url);
    },
    create(data) {
        const url ='/api/khuyenmai';
        return axiosClient.post(url,data);
    },
    update(idkm, data){
        const url =`/api/khuyenmai/${idkm}`;
        return axiosClient.put(url,data)
    },
    delete(idkm){
        const url = `/api/khuyenmai/${idkm}`;
        return axiosClient.delete(url);
    }
}

export default KhuyenMaiAPI;