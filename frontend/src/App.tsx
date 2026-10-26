import { Routes, Route } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";
import CreateNews from "./components/CreateNews/CreateNews";

function App() {
    return (
        <>
            <Routes>
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/create" element={<CreateNews />} />
            </Routes>
        </>
    );
}

export default App;
