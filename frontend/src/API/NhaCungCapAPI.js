import axiosClient from './axiosClient';

const NhaCungCapAPI = {
  get() {
    const url = '/api/nhacungcap';
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/nhacungcap';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/api/nhacungcap/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/api/nhacungcap/${id}`;
    return axiosClient.put(url, data);
  },
};

export default NhaCungCapAPI;
