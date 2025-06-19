import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import Listing from "./pages/Listing";
import ScrollToTop from "./components/ScrollToTop";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyBooking from "./pages/MyBooking.jsx";
import Wishlist from "./components/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import EditListing from "./pages/EditListing.jsx";
import HostDashboard from "./pages/HostDashboard.jsx";
import GuestRequest from "./pages/GuestRequest.jsx";
import ListingsPage from "./pages/ListingsPage.jsx";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          className: "bg-white border text-gray-800 shadow-lg",
          style: {
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
          },
        }}
      />
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/listings/:id" element={<Listing />} />
          <Route path="all-listings" element={<ListingsPage />} />
          <Route path="/bookings" element={<MyBooking />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/host/create-listing" element={<CreateListing />} />
          <Route path="/host/edit-listing/:id" element={<EditListing />} />
          <Route path="/host/guest-booking" element={<GuestRequest />} />
          <Route path="/host/dashboard" element={<HostDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
