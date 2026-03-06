import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';

interface AdminAuthLayoutProps {
    children: React.ReactNode
}

function ProtectedAdmin({ children }: AdminAuthLayoutProps) {
    const isAuthenticated = useAppSelector(({ users }) => users.isAuthenticated);
    const userInfo = useAppSelector(({ users }) => users.userData)

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace={true}></Navigate>;
    }
    if (userInfo && userInfo.role !== 'ADMIN') {
        return <Navigate to="/" replace={true}></Navigate>;
    }
    return children;
}

export default ProtectedAdmin;