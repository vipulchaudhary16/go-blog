import { useSession } from '@/contexts/UserContext';
import useFetchData from '@/hooks/use-fetch-data';
import blogApi from '@/api/blogApi';
import Loader from '../common/Loader';
import DOMPurify from 'dompurify';

const BlogList = () => {
  const { user } = useSession();
  const { data, loading, error } = useFetchData({ apiCall: blogApi.getUserBlogs, payload: user });
  const blogs = data?.data;

  if (loading) return <Loader text="Loading Your Blogs..." />;
  if (error) return <p className="text-red-600 text-center">Failed to load blogs.</p>;

  return (
    <div className="grid grid-cols-4 gap-4 mx-auto px-4 pt-4">
      {(blogs ?? []).map((blog: any) => (
        <div
          key={blog.id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 relative flex flex-col h-full"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2 mr-5">{blog.title}</h2>
          <p className="text-sm text-gray-500 mb-2">By {blog.user.first_name}</p>
          <div
            className="text-gray-700 text-sm mb-4 flex-1"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.post.slice(0, 150) + '...'),
            }}
          ></div>
          <div className="flex flex-col gap-2 justify-end items-end mt-auto">
            <div className="flex flex-wrap gap-2 items-end justify-end">
              {blog.tags?.map((tag: any) => (
                <span key={tag} className="bg-gray-200 px-2 py-1 text-xs rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={`/blog/${blog.id}`}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read more →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
