import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Add from "./pages/Add";
import Article from "./pages/Article";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav></nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}
