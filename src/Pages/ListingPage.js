import React, { useState, useEffect } from "react";
// import Listing from "../components/Listing";
import { useParams } from "react-router-dom";

import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  query,
  where
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function ListingPage() {
  const promosCollectionRef = collection(db, "promos");

  const [userID, setUserID] = useState(localStorage.getItem("app_userId"));
  const [listing, setListing] = useState([]);
  const [promos, setPromos] = useState([]);
  const { id } = useParams();
  const [isMyListing, setIsMyListing] = useState(false);
  const navigate = useNavigate();

  //queries
  const q = query(promosCollectionRef, where("listingID", "==", id)); //Only gets listings created by logged in user

  useEffect(() => {
    const getListing = async () => {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing({ ...docSnap.data(), id: id });
        // setIsMyListing(id == userID)
      } else {
        console.log("No such document");
      }
    };

    const getPromos = async () => {
      const data = await getDocs(q);
      setPromos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(promos);
    };

    getListing();
    getPromos();
  }, []);

  useEffect(() => {
    setIsMyListing(userID === listing.adminID);
  }, [userID, listing]);

  return (
    <>
      <h3 className="title is-3">Listing Details Page</h3>
      <p>{listing.name}</p>
      <p>{listing.address}</p>
      <p>{listing.phoneNumber}</p>
      <p>{listing.category}</p>
      <p>{listing.website}</p>
      {isMyListing ? (
        <button
          className="button is-info has-text-weight-bold mt-2"
          onClick={() => navigate(`/listing/${id}/new-promo`)}
        >
          Add Promo{" "}
        </button>
      ) : (
        <></>
      )}
      <h3 className="title is-3">Promos</h3>
      {promos.map((promo) => {
        return (
          <div key={promo.id} className="box">
            <Link to={`/listing/${id}/promo/${promo.id}`}>{promo.name}</Link>
          </div>
        );
      })}
    </>
  );
}

export default ListingPage;
