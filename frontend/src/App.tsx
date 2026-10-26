import { Routes, Route } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/news" element={<NewsPage />} />
            </Routes>
        </>
    );
}

export default App;
