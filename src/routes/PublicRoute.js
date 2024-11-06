import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
    // const { user } = useSelector(state => state.auth);

    // return user ? <Navigate to="/app" /> : element;
    return element;
};

export default PublicRoute;
