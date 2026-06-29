import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { Loading } from '../../components/ui/Loading'

export const ProtectedRoute = ({ redirectTo = "/" }) => {

    const { session, loading } = useAuth()

    if (loading) return <Loading />

    if (!session) {
        return <Navigate to={redirectTo} replace />
    }

    return <Outlet />
}