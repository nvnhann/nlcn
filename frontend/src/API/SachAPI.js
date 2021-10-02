import axiosClient from './axiosClient';

const SachApi = {
  get() {
    const url = '/api/sach';
    return axiosClient.get(url);
  },
  getAll() {
    const url = '/api/sach/chitietsach';
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/sach';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/api/sach/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/api/sach/${id}`;
    return axiosClient.put(url, data);
  },
};

export default SachApi;
