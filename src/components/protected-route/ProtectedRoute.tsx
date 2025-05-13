import { useNavigate } from 'react-router-dom';
import { useSelector } from './../../../src/services/store';
import { useEffect } from 'react';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const isAuthChecked = useSelector((state) => state.user.isAuth);
  useEffect(() => {
    if (!isAuthChecked) {
      navigate('/login');
    }
  }, [isAuthChecked, navigate]);
  return children;
};
