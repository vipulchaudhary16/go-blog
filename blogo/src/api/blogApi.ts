import { Blog } from '@/types/blog';
import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './endPoints';

const createBlog = async (blogData: Blog) => {
  const response = await axiosInstance.post(API_ENDPOINTS.CREATE_BLOG, blogData);
  return response.data;
};

const getUserBlogs = async (user: any) => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.GET_BLOG}?user_id=${user.id}`);
  return response.data;
};

const getBlog = async (id: any) => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.GET_BLOG}/${id}`);
  return response.data;
};

const getFeed = async () => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.FEED}`);
  return response;
};

export default { createBlog, getUserBlogs, getBlog, getFeed };
