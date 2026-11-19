import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { PacmanLoader } from "react-spinners"
import { PacmanSpinner } from "../Loaders/Spinners/PacmanSpinner"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <PacmanSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
