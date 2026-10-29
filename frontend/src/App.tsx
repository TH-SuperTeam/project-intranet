import { Routes, Route } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import { TargetAudience } from "./types/TargetAudience";
import CreateNewsPage from "./pages/CreateNewsPage";
import EditNewsPage from "./pages/EditNewsPage";
import { AudienceProvider } from "./contexts/AudienceProvider";

function App() {
    return (
        <>
            <AudienceProvider>
                <Routes>
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/news/create" element={<CreateNewsPage />} />
                    <Route path="/news/:id" element={<NewsDetailsPage />} />
                    <Route path="/news/:id/edit" element={<EditNewsPage />} />
                </Routes>
            </AudienceProvider>
        </>
    );
}

export default App;
