import { Link } from 'react-router';

const Actions = ({ blog }: any) => {
  return (
    <>
      <span className="absolute top-5 right-5 custom-hyperlink">
        <Link to={`/form/blog/${blog.id}`}>Edit</Link>
      </span>
    </>
  );
};

export default Actions;
