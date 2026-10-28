import { Routes, Route } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import { TargetAudience } from "./types/TargetAudience";
import CreateNewsPage from "./pages/CreateNewsPage";

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
            </Routes>
        </>
    );
}

export default App;
