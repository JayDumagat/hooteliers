import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      setLoading(true);
      await checkAuth();
      setLoading(false);
    };

    // Only check auth if user is null or undefined
    if (user === null || user === undefined) {
      verifyAuth();
    }
  }, [user, checkAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
