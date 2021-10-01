import axiosClient from './axiosClient';

const KichThuotAPI = {
  get() {
    const url = '/api/kichthuot';
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/kichthuot';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/api/kichthuot/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/api/kichthuot/${id}`;
    return axiosClient.put(url, data);
  },
};

export default KichThuotAPI;
