import axiosClient from './axiosClient';

const NhaXuatBanAPI = {
  get(p) {
    const url = '/api/nhaxuatban';
    return axiosClient.get(url, {params: p});
  },
  getExcel(){
    const url = '/api/nxbxlsx';
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/nhaxuatban';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/api/nhaxuatban/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/api/nhaxuatban/${id}`;
    return axiosClient.put(url, data);
  },
};

export default NhaXuatBanAPI;
