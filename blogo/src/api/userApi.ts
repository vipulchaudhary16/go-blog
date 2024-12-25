import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './endPoints';

const userProfile = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER_PROFILE);
  return response.data;
};

export default { userProfile };
