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
import ProfilePage from "./pages/ProfilePage";
import UserMessage from "./components/UserMessage";
import CommunityPage from "./pages/CommunityPage";
import CustomFileInput from "./components/CustomFileInput";
import MovieDetailPage from "./pages/MovieDetailPage";
import BookDetailPage from "./pages/BookDetailPage";

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
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/:userId/moviedetail/:itemId" element={<MovieDetailPage/>} />
        <Route path="/:userId/bookdetail/:itemId" element={<BookDetailPage/>} />
        <Route path="/uikit" element={<UIKitPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <UserMessage />
    </>
  );
}

export default App;
