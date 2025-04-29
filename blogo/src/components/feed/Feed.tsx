import useFetchData from '@/hooks/use-fetch-data';
import Loader from '../common/Loader';
import { useHeader } from '@/contexts/HeaderContext';
import blogApi from '@/api/blogApi';
import { useEffect } from 'react';
import BlogListItem from '../blog/BlogListItem';

const Feed = () => {
  const { data, loading, error } = useFetchData({ apiCall: blogApi.getFeed });
  const { setHeaderTitle } = useHeader();
  const blogs = data?.data?.data;

  useEffect(() => {
    setHeaderTitle('Feed');
  }, []);

  if (loading) return <Loader text="Loading Your Blogs..." />;
  if (error) return <p className="text-red-600 text-center">Failed to load blogs.</p>;

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mx-auto px-4 pt-4">
        {(blogs ?? []).map((blog: any) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
