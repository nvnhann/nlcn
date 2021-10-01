import axiosClient from './axiosClient';

const NhomTheLoaiAPI = {
  get() {
    const url = '/api/nhomtheloai';
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/nhomtheloai';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/api/nhomtheloai/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/api/nhomtheloai/${id}`;
    return axiosClient.put(url, data);
  },
};

export default NhomTheLoaiAPI;
