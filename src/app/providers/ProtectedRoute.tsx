import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/model/authStore"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useAuthStore((s) => s.accessToken);

    if(!accessToken) {
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>
}