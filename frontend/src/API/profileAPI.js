import axiosClient from './axiosClient';

const profileAPI = {
    create(data){
        const url = '/api/profile';
        return axiosClient.post(url,data);
    },
    get(){
        const url = '/api/profile';
        return axiosClient.get(url);
    },
    update(data){
        const url = '/api/profile';
        return axiosClient.put(url,data);
    }
}

export default profileAPI;