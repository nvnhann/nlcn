import axiosClient from './axiosClient';

const TheLoaiAPI = {
  get() {
    const url = '/api/theloai';
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/theloai';
    return axiosClient.post(url, data);
  },
  delete(id, data) {
    const url = `/api/theloai/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/api/theloai/${id}`;
    return axiosClient.put(url, data);
  },
};

export default TheLoaiAPI;
