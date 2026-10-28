import { Routes, Route } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";
import CreateNews from "./components/CreateNews/CreateNews";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import { TargetAudience } from "./types/TargetAudience";

function App() {
    return (
        <>
            <Routes>
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/create" element={<CreateNews />} />
                <Route
                    path="/news/:id"
                    element={<NewsDetailsPage audience={TargetAudience.ALL} />}
                />
            </Routes>
        </>
    );
}

export default App;
