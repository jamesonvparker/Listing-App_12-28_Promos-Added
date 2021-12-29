import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  query,
  where
} from "firebase/firestore";

import { Link, useNavigate } from "react-router-dom";

function AccountPage() {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState();
  const [userID, setUserID] = useState(localStorage.getItem("app_userId"));

  const [listings, setListings] = useState([]);
  const [numOfListings, setNumOfListings] = useState(0);
  const listingsCollectionRef = collection(db, "listings");
  const navigate = useNavigate();

  //queries
  const q = query(listingsCollectionRef, where("adminID", "==", userID)); //Only gets listings created by logged in user

  useEffect(() => {
    const getListings = async () => {
      const data = await getDocs(q); //get the query instead of all docs
      setNumOfListings(data.docs.length);
      // setListings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getListings();
  }, []);

  useEffect(() => {
    console.log(listings);
  }, [listings]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    const getUserProfile = async () => {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setUserProfile({ ...docSnap.data(), id: user.uid });
      } else {
        console.log("No such document");
      }
    };

    getUserProfile();
  }, [user]);

  return (
    <>
      <h1 className="title is-size-1">Account Page</h1>

      <h3 className="title is-3">Username</h3>
      <p className="subtitle">{userProfile?.displayName}</p>

      <h3 className="title is-3">Email Address</h3>
      <p className="subtitle">{userProfile?.email}</p>

      <h3 className="title is-3">Phone Number</h3>
      <p className="subtitle">{userProfile?.phoneNumber}</p>

      <h3 className="title is-3">Account Type</h3>
      <p className="subtitle">{userProfile?.accountType}</p>

      <h3 className="title is-3 mb-1">Number of Listings</h3>
      <Link to="/my-account/listings" className="subtitle">
        {numOfListings}
      </Link>
    </>
  );
}

export default AccountPage;
