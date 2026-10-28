import { Routes, Route } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import { TargetAudience } from "./types/TargetAudience";
import CreateNewsPage from "./pages/CreateNewsPage";
import EditNewsPage from "./pages/EditNewsPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/create" element={<CreateNewsPage />} />
                <Route
                    path="/news/:id"
                    element={<NewsDetailsPage audience={TargetAudience.ALL} />}
                />
                <Route path="/news/:id/edit" element={<EditNewsPage />} />
            </Routes>
        </>
    );
}

export default App;
