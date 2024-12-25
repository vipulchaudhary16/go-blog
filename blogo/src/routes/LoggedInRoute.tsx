import Layout from '@/components/setup/Layout';
import { useSession } from '@/contexts/UserContext';
import { Navigate, Outlet } from 'react-router';

const LoggedInRoute = () => {
  const { isLoggedIn } = useSession();

  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default LoggedInRoute;
