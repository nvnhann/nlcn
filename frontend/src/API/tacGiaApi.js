import axiosClient from './axiosClient';

const tacGiaApi = {
  get(p) {
    const url = '/api/tacgia';
    return axiosClient.get(url, {params: p});
  },
  create(data) {
    const url = '/api/tacgia';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/api/tacgia/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/api/tacgia/${id}`;
    return axiosClient.put(url, data);
  },
};

export default tacGiaApi;
