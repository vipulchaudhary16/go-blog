import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './endPoints';

const subscribeUser = async (to_id: number) => {
  const response = await axiosInstance.post(API_ENDPOINTS.SUBSCRIBE, { to_id });
  return response;
};

const unsubscribeUser = async (to_id: number) => {
  const response = await axiosInstance.post(API_ENDPOINTS.UNSUBSCRIBE, { to_id });
  return response;
};

export default { subscribeUser, unsubscribeUser };
