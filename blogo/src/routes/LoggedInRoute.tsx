import Layout from '@/components/setup/Layout';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const LoggedInRoute = () => {
  const [loading, setLoading] = useState(true);

  const isLoggedIn = true;

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
      } finally {
      }
    };

    verifyAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default LoggedInRoute;
