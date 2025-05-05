import Layout from '@/components/setup/Layout';
import { useSession } from '@/contexts/UserContext';
import { Navigate, Outlet } from 'react-router';

const LoggedInRoute = () => {
  const { isLoggedIn } = useSession();

  const current_url = window.location.pathname;

  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={`/login?success_url=${current_url}`} />
  );
};

export default LoggedInRoute;
