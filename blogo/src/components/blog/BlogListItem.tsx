import DOMPurify from 'dompurify';
import { Link } from 'react-router';

const BlogListItem = ({ blog }: any) => {
  return (
    <div>
      <div
        key={blog.id}
        className="bg-white shadow-md rounded-lg p-6 border border-gray-200 relative flex flex-col h-full"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-2 mr-5">
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </h2>
        <p className="prose text-sm text-gray-500 mb-2">
          By {blog.user.first_name} {blog.user.last_name}
        </p>
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
          <Link
            to={`/blog/${blog.id}`}
            className="custom-hyperlink text-sm font-medium hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogListItem;
