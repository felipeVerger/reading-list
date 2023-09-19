import { Navigate, Outlet } from 'react-router-dom'
import { fetchUser } from './fetchUser';

const PrivateRoutes = () => {
  const user = fetchUser();
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes