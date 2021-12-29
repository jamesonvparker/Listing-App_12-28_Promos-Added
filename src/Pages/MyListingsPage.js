import React from "react";
import MyListings from "../components/MyListings";
import { useNavigate } from "react-router-dom";

function MyListingsPage() {
  const navigate = useNavigate();
  return (
    <>
      <h3 className="title">My Listings Page</h3>
      <h3 className="subtitle">
        Manage your listings here. A listing is a business or service that you
        would like to make available for customers to see.
      </h3>
      <button
        className="button is-info has-text-weight-bold mb-5"
        onClick={() => navigate("/my-account/new-listing")}
      >
        Add New Listing +
      </button>
      <MyListings />
    </>
  );
}

export default MyListingsPage;
