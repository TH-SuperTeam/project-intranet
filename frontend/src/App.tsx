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
import MyProfilePage from "./pages/MyProfilePage";
import UserProfilePage from "./pages/UserProfilePage";
import EducationPage from "./pages/EducationPage";
import SchedulePage from "./pages/SchedulePage";
import ThemeManager from "./components/auth/ThemeManager";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
    return (
        <>
            <AuthProvider>
                <ThemeManager />
                <AudienceProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/public"
                            element={<PublicDashboardPage />}
                        />
                        <Route
                            path="/login/forgot-password"
                            element={<ForgotPasswordPage />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ResetPasswordPage />}
                        />

                        <Route element={<ProtectedRoute />}>
                            {/* All authenticated users */}
                            <Route element={<MainLayout />}>
                                <Route
                                    path="/dashboard"
                                    element={<DashboardPage />}
                                />
                                <Route
                                    path="/profile"
                                    element={<MyProfilePage />}
                                />
                                <Route path="/news" element={<NewsPage />} />
                                <Route
                                    path="/news/:id"
                                    element={<NewsDetailsPage />}
                                />
                                <Route path="/users" element={<UsersPage />} />
                                <Route
                                    path="/users/:id"
                                    element={<UserProfilePage />}
                                />
                                <Route
                                    path="/schedule"
                                    element={<SchedulePage />}
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
                                        path="/users/create"
                                        element={<CreateUsersPage />}
                                    />
                                    <Route
                                        path="/admin/education"
                                        element={<EducationPage />}
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
