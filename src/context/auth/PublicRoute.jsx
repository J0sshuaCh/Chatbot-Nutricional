import { Loading } from '../../components/ui/Loading'
import { useAuth } from '../../lib/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicRoute = ({ redirectTo = "/gestor-bebe" }) => {

    const { session, loading } = useAuth()

    if (loading) return <Loading />

    if (session) {
        return <Navigate to={redirectTo} replace />
    }

    return <Outlet />
}