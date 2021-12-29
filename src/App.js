import Navbar from "./components/Navbar";
import "./styles.css";
import { useState } from "react";
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

export default function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = async () => {};

  const login = async () => {};

  const logout = async () => {};

  return (
    <div className="App">
      <Router>
        <div className="columns is-mobile is-flex-direction-column is-fullheight-100vh is-marginless">
          <header className="column is-narrow">
            <Navbar register={register} login={login} logout={logout} />
          </header>
          <div className="column is-paddingless">
            <Routes>
              <Route path="/" element={<Home />} />
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

              {/* <Route path="/" element={<Home />} />
                  <Route path="/listing/:id" element={<Listing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:username" element={<Profile />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/new/listing" element={<NewListing />} />
                  <Route path="/slide/:id" element={<SlideDetail />} />
                  <Route path="*" element={<ErrorPage />} /> */}
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
