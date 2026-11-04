import { Routes, Route } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import CreateNewsPage from "./pages/CreateNewsPage";
import EditNewsPage from "./pages/EditNewsPage";
import { AudienceProvider } from "./contexts/AudienceProvider";
import UsersPage from "./pages/UsersPage";
import CreateUsersPage from "./pages/CreateUsersPage";

function App() {
    return (
        <>
            <AudienceProvider>
                <Routes>
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/news/create" element={<CreateNewsPage />} />
                    <Route path="/news/:id" element={<NewsDetailsPage />} />
                    <Route path="/news/:id/edit" element={<EditNewsPage />} />

                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/users/create" element={<CreateUsersPage />} />
                </Routes>
            </AudienceProvider>
        </>
    );
}

export default App;
