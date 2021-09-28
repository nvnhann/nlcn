import axiosClient from './axiosClient';

const tacGiaApi = {
  get() {
    const url = '/api/tacgia';
    return axiosClient.get(url);
  },
};

export default tacGiaApi;
