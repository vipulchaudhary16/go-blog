import useFetchData from '@/hooks/use-fetch-data';
import blogApi from '@/api/blogApi';
import Loader from '../common/Loader';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router';
import Actions from './Actions';

const ReadBlog = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData({
    apiCall: blogApi.getBlog,
    payload: id?.toString(),
  });
  const blog = data?.data;

  if (loading) return <Loader text="Loading Blog..." />;
  if (error || !blog) return <p className="text-red-600 text-center">Failed to load blog.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 m-6 border border-gray-200 text-wrap relative">
      <div className="sticky top-0 bg-white py-4 z-10 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500">By {blog.user.first_name}</p>
        <Actions blog={blog} />
      </div>
      <div className="prose max-w-full text-gray-800 mt-4 overflow-auto h-[70vh] p-2">
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.post) }}></div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {blog?.tags?.map((tag: string, index: number) => (
          <span key={index} className="bg-gray-200 px-2 py-1 text-xs rounded-md">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReadBlog;
