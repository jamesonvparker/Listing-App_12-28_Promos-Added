import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MyListings() {
  const [userID, setUserID] = useState(localStorage.getItem("app_userId"));
  const [listings, setListings] = useState([]);
  const listingsCollectionRef = collection(db, "listings");
  const navigate = useNavigate();

  //queries
  const q = query(listingsCollectionRef, where("adminID", "==", userID)); //Only gets listings created by logged in user

  useEffect(() => {
    const getListings = async () => {
      // const data = await getDocs(listingsCollectionRef);
      const data = await getDocs(q); //get the query instead of all docs
      setListings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getListings();
  }, []);

  useEffect(() => {
    console.log(listings);
  }, [listings]);

  return (
    <>
      <h4 className="title is-4">MyListingsComponent</h4>
      {listings.map((listing) => {
        return (
          <Link to={`/listing/${listing.id}`} className="box" key={listing.id}>
            <p>{listing.name}</p>
            <p>{listing.address}</p>
            <p>{listing.category}</p>
            <p>{listing.website}</p>
          </Link>
        );
      })}
    </>
  );
}

export default MyListings;
