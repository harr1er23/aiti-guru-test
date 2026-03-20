import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../../pages/login/LoginPage"
import ProductsPage from "../../pages/products/ProductsPage"
import { ProtectedRoute } from "./ProtectedRoute"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route 
                    path="/products" 
                    element={
                        <ProtectedRoute>
                            <ProductsPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
        </BrowserRouter>
    )
}