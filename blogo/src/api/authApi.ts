import { UserDataSignUp } from '@/types/user';
import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './endPoints';

const createUser = async (userData: UserDataSignUp) => {
  const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData);
  return response.data;
};

export default {
  createUser,
};
