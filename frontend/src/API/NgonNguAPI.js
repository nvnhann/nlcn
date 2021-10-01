import axiosClient from './axiosClient';

const NgonNguAPI = {
  get() {
    const url = '/api/ngonngu';
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/ngonngu';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/api/ngonngu/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/api/ngonngu/${id}`;
    return axiosClient.put(url, data);
  },
};

export default NgonNguAPI;
