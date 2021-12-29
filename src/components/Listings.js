import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { Link } from "react-router-dom";

function Listings() {
  const [listings, setListings] = useState([]);
  const listingsCollectionRef = collection(db, "listings");

  const [userID, setUserID] = useState(localStorage.getItem("app_userId"));

  const thisIsAllTheSubCode = () => {
    //Collapse this until time to figure out the subs
    //Start Subscription Handling
    // const [mySubscriptions, setMySubscriptions] = useState(
    //   [localStorage.getItem("subs")] || []
    // );
    // const mySubscriptionsCollectionRef = collection(db, "subscriptions");
    // const [inMySubscriptions, setInMySubscriptions] = useState(true);
    // useEffect(() => {
    //   setInMySubscriptions(mySubscriptions.includes(true));
    // }, [mySubscriptions]);
    // const inMySubscriptions = ; //listing.id
    //queries
    // const q = query(mySubscriptionsCollectionRef, where("adminID", "==", userID)); //Only gets listings created by logged in user
    //Get User's Subscriptions
    // useEffect(() => {
    //   const getSubscriptions = async () => {
    //     const snap = await getDoc(doc(db, "subscriptions", userID));
    //     const subs = snap.data().listings;
    //     if (snap.exists()) {
    //       console.log("subscriptions", subs);
    //       setMySubscriptions(subs);
    //       localStorage.setItem("subs", subs);
    //     } else {
    //       console.log("No such document");
    //     }
    //   };
    //   getSubscriptions();
    // }, []);
    // useEffect(() => {
    //   console.log("mySubsUpdated:", mySubscriptions);
    // }, [mySubscriptions]);
    // const isSubscribed = (listing) => {
    //   if(mySubscriptions.includes(listing.id)) {
    //   }
    // }
    // const addToSubscriptions = async (listing) => {
    // console.log(listing);
    // const listingRef = doc(db, "subscriptions", userID);
    // const lid = listing.id;
    // console.log("adding listing id:", lid);
    // if (mySubscriptions.includes(lid) === false) {
    //   console.log("new sub");
    //   setMySubscriptions([...mySubscriptions, lid]);
    // } else {
    //   console.log("existing sub");
    // }
    // try {
    //   const subs = await setDoc(listingRef, {
    //     listings: mySubscriptions ? [...mySubscriptions, lid] : [lid]
    //     // listings: [...mySubscriptions, lid]
    //   });
    //   console.log("subs awaited", subs);
    //   // setMySubscriptions(subs);
    //   // setInMySubscriptions(mySubscriptions?.includes(lid));
    // } catch (error) {
    //   console.log("add", error.message);
    // }
    // };
    // const removeFromSubscriptions = async (listing) => {
    //   const listingRef = doc(db, "subscriptions", userID);
    //   const lid = listing.id;
    //   let filtered = mySubscriptions.filter((sub) => sub !== lid);
    //   setMySubscriptions(filtered);
    //   // try {
    //   //   await setDoc(
    //   //     listingRef,
    //   //     { listings: mySubscriptions.filter((sub) => sub !== lid) },
    //   //     { merge: "true" }
    //   //   );
    //   //   console.log(`${listing.name} Removed from the Watchlist !`);
    //   // } catch (error) {
    //   //   console.log("remove:", error.message);
    //   // }
    // };
  };

  //Get Listings
  useEffect(() => {
    const getListings = async () => {
      const data = await getDocs(listingsCollectionRef);
      setListings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getListings();
  }, []);

  useEffect(() => {
    console.log(listings);
  }, [listings]);

  return (
    <>
      <h4 className="title is-4">Listings Component</h4>
      {listings.map((listing) => {
        // const inMySubscriptions = mySubscriptions?.includes(listing.id); //listing.id
        // console.log("inMySubs?:", listing.name, inMySubscriptions);
        return (
          <div className="box" key={listing.id}>
            <Link to={`listing/${listing.id}`}>
              <p>{listing.name}</p>
            </Link>
            <p>{listing.address}</p>
            <p>{listing.category}</p>
            <p>{listing.website}</p>
            {userID && (
              <nav className="level is-mobile is-hidden">
                <div className="level-right">
                  <a className="level-item">
                    <span
                      className="icon is-small"
                      // onClick={
                      //   inMySubscriptions
                      //     ? removeFromSubscriptions(listing)
                      //     : addToSubscriptions(listing)
                      // }
                    >
                      <i className="fas fa-heart"></i>
                      <i className="far fa-heart"></i>
                      {/* {inMySubscriptions ? (
                        <i className="fas fa-heart"></i>
                      ) : (
                        <i className="far fa-heart"></i>
                      )} */}
                    </span>
                  </a>
                </div>
              </nav>
            )}
          </div>
        );
      })}
    </>
  );
}

export default Listings;
