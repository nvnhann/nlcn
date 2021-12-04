import axiosClient from './axiosClient';

const SachApi = {
  get(f) {
    const url = '/api/sach';
    return axiosClient.get(url, {params:f});
  },
  getSachKm(){
    const url = '/api/sachkm';
    return axiosClient.get(url);
  },
  getById(idsach) {
    const url = `/api/sach/${idsach}`;
    return axiosClient.get(url);
  },
  getAll() {
    const url = '/api/chitietsach';
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
  getExcel() {
    const url = '/api/sachxlsx';
    return axiosClient.get(url);
  }
};

export default SachApi;
