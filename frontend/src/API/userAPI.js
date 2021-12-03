import axiosClient from "./axiosClient";

const userAPI = {
    signup(data){
        const url = '/api/user/signup';
        return axiosClient.post(url, data);
    },
    login(data){
        const url = '/api/user/login';
        return axiosClient.post(url, data);
    },
    getAll(f){
        const url = '/api/user/getall';
        return axiosClient.get(url, {params: f});
    },
    changePwd(data){
        const url = '/api/user/changepwd';
        return axiosClient.post(url, data)
    },
    changePwdByEmail(data){
        const url = '/api/user/forgetpwd';
        return axiosClient.post(url, data)
    },
    delete(idtk){
        const url = `/api/user/${idtk}`;
        return axiosClient.delete(url)
    }

}
export default userAPI;