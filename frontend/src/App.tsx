import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import CreateNewsPage from "./pages/CreateNewsPage";
import EditNewsPage from "./pages/EditNewsPage";
import { AudienceProvider } from "./contexts/AudienceProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import UsersPage from "./pages/UsersPage";
import CreateUsersPage from "./pages/CreateUsersPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import MainLayout from "./layouts/MainLayout";
import PublicDashboardPage from "./pages/PublicDashboardPage";

function App() {
    return (
        <>
            <AuthProvider>
                <AudienceProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/public"
                            element={<PublicDashboardPage />}
                        />

                        <Route element={<ProtectedRoute />}>
                            {/* All authenticated users */}
                            <Route element={<MainLayout />}>
                                <Route
                                    path="/dashboard"
                                    element={<DashboardPage />}
                                />
                                <Route path="/news" element={<NewsPage />} />
                                <Route
                                    path="/news/:id"
                                    element={<NewsDetailsPage />}
                                />

                                {/* Admin only */}
                                <Route element={<AdminRoute />}>
                                    <Route
                                        path="/news/create"
                                        element={<CreateNewsPage />}
                                    />
                                    <Route
                                        path="/news/:id/edit"
                                        element={<EditNewsPage />}
                                    />
                                    <Route
                                        path="/users"
                                        element={<UsersPage />}
                                    />
                                    <Route
                                        path="/users/create"
                                        element={<CreateUsersPage />}
                                    />
                                </Route>
                            </Route>
                        </Route>

                        <Route
                            path="/"
                            element={<Navigate to="/dashboard" replace />}
                        />
                    </Routes>
                </AudienceProvider>
            </AuthProvider>
        </>
    );
}

export default App;
