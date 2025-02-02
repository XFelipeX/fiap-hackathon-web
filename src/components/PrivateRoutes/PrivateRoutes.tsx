import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { bouncy } from 'ldrs'
bouncy.register()
import {
  Loading
} from './styles'

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Loading>
        <l-bouncy
          size="45"
          speed="1.75" 
          color="white" 
        ></l-bouncy>
      </Loading>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
