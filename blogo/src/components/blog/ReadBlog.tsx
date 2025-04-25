import useFetchData from '@/hooks/use-fetch-data';
import blogApi from '@/api/blogApi';
import Loader from '../common/Loader';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router';
import Actions from './Actions';
import BlogFooter from './BlogFooter';
import { useHeader } from '@/contexts/HeaderContext';
import { useEffect } from 'react';

const ReadBlog = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData({
    apiCall: blogApi.getBlog,
    payload: id?.toString(),
  });
  const { setHeaderTitle } = useHeader();

  const blog = data?.data;

  useEffect(() => {
    setHeaderTitle(`
        ${blog?.title}
        `);
  }, [blog]);

  if (loading) return <Loader text="Loading Blog..." />;
  if (error || !blog) return <p className="text-red-600 text-center">Failed to load blog.</p>;

  return (
    <div className="mx-auto p-6 border border-gray-200 text-wrap relative">
      <div className="sticky top-0 bg-white py-4 z-10 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500">By {blog.user.first_name}</p>
        <Actions blog={blog} />
      </div>
      <div className="prose max-w-full text-gray-800 mt-4 overflow-auto h-[70vh] p-2 flex flex-col">
        <div className="flex-1">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.post) }}></div>
        </div>
        <div className="mt-auto">
          <BlogFooter blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;
