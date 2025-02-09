import { Blog } from '@/types/blog';
import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './endPoints';

const createBlog = async (blogData: Blog) => {
  const response = await axiosInstance.post(API_ENDPOINTS.CREATE_BLOG, blogData);
  return response.data;
};

export default { createBlog };
