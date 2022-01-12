import Navbar from "./components/Navbar";
import "./styles.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import AccountPage from "./Pages/AccountPage";
import ListingPage from "./Pages/ListingPage";
import MyListingsPage from "./Pages/MyListingsPage";
import NewListingPage from "./Pages/NewListingPage";
import NewPromoPage from "./Pages/NewPromoPage";
import PromoPage from "./Pages/PromoPage";
import OneSignal from "react-onesignal";
import HomeLayout from "./Pages/HomeLayout";

export default function App() {
  useEffect(() => {
    OneSignal.init({
      appId: "0b115317-080f-452f-87c8-96f17c02595a"
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="columns is-mobile is-flex-direction-column is-fullheight-100vh is-marginless">
          <header className="column is-narrow">
            <Navbar />
          </header>
          <div className="column is-paddingless flex-basis-unset">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/layout" element={<HomeLayout />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/my-account" element={<AccountPage />} />
              <Route path="/my-account/listings" element={<MyListingsPage />} />
              <Route
                path="/my-account/new-listing"
                element={<NewListingPage />}
              />
              <Route path="/listing/:id" element={<ListingPage />} />
              <Route path="/listing/:id/new-promo" element={<NewPromoPage />} />
              <Route
                path="/listing/:id/promo/:promoId"
                element={<PromoPage />}
              />

              {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
          </div>
          <footer className="column is-narrow is-paddingless">
            {/* <Footer /> */}
          </footer>
        </div>
      </Router>
    </div>
  );
}
