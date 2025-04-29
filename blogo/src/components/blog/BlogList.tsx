import { useSession } from '@/contexts/UserContext';
import useFetchData from '@/hooks/use-fetch-data';
import blogApi from '@/api/blogApi';
import Loader from '../common/Loader';
import { useHeader } from '@/contexts/HeaderContext';
import { useEffect } from 'react';
import BlogListItem from './BlogListItem';

const BlogList = () => {
  const { user } = useSession();
  const { data, loading, error } = useFetchData({ apiCall: blogApi.getUserBlogs, payload: user });
  const { setHeaderTitle } = useHeader();
  const blogs = data?.data;

  useEffect(() => {
    setHeaderTitle('Your Blogs');
  }, []);

  if (loading) return <Loader text="Loading Your Blogs..." />;
  if (error) return <p className="text-red-600 text-center">Failed to load blogs.</p>;

  return (
    <div className="grid grid-cols-4 gap-4 mx-auto px-4 pt-4">
      {(blogs ?? []).map((blog: any) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
