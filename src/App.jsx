import { Routes, Route } from "react-router-dom";
import "./styles/styles.scss";
import SplashPage from "./pages/SplashPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UIKitPage from "./pages/UIKitPage";
import Navbar from "./components/Navbar";
import AddInterestPage from "./pages/AddInterestPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/search" element={<AddInterestPage />} />
        {/* <Route path="/results" element={<SearchResultsPage />} /> */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/dashboard/:userId" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/uikit" element={<UIKitPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
