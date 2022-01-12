import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { Link } from "react-router-dom";
// import distance from "distance-matrix-api";
import SubscribeButton from "./SubscribeButton";

// console.log("distance", distance);

function Listings() {
  const [listings, setListings] = useState([]);
  const listingsCollectionRef = collection(db, "listings");

  const [userID, setUserID] = useState(localStorage.getItem("app_userId"));

  // Collapse this until time to figure out the subs
  // Start Subscription Handling
  const [mySubscriptions, setMySubscriptions] = useState(
    [localStorage.getItem("subs")] || []
  );

  const mySubscriptionsCollectionRef = collection(db, "subscriptions");

  // queries
  const q = query(mySubscriptionsCollectionRef, where("adminID", "==", userID)); //Only gets listings created by logged in user

  // Get User's Subscriptions
  useEffect(() => {
    const getSubscriptions = async () => {
      const snap = await getDoc(doc(db, "subscriptions", userID));
      const subs = snap.data().listings;
      if (snap.exists()) {
        console.log("subscriptions", subs);
        setMySubscriptions(subs);
        localStorage.setItem("subs", subs);
      } else {
        console.log("No such document");
      }
    };
    getSubscriptions();
  }, []);

  useEffect(() => {
    console.log("mySubsUpdated:", mySubscriptions);
  }, [mySubscriptions]);

  const addToSubscriptions = async (listing) => {
    const userSubscriptionsRef = doc(db, "subscriptions", userID),
      listingSubscriptionsRef = doc(db, "listings", listing.id),
      lid = listing.id;

    const docSnap = await getDoc(listingSubscriptionsRef);
    const listingSubscribers = docSnap.data().subscribers || [];
    console.log("data-subscribers", docSnap.data().subscribers);

    if (listingSubscribers.includes(userID) === false) {
      await updateDoc(listingSubscriptionsRef, {
        subscribers: [...listingSubscribers, userID]
      });
    }

    console.log(listingSubscriptionsRef);
    console.log(`${listing.name} Added to the Watchlist with id: ${lid}`);

    if (mySubscriptions.includes(lid) === false) {
      setMySubscriptions([...mySubscriptions, lid]);
    } else {
      console.log("existing sub");
    }

    try {
      await setDoc(userSubscriptionsRef, {
        listings: mySubscriptions ? [...mySubscriptions, lid] : [lid]
      });
    } catch (error) {
      console.log("add", error.message);
    }
  };

  const removeFromSubscriptions = async (listing) => {
    console.log("removeFromSubs clicked", listing);

    const subscriptionsRef = doc(db, "subscriptions", userID),
      lid = listing.id,
      filtered = mySubscriptions.filter((sub) => sub !== lid);

    setMySubscriptions(filtered);

    try {
      await setDoc(
        subscriptionsRef,
        { listings: mySubscriptions.filter((sub) => sub !== lid) },
        { merge: "true" }
      );
      console.log(`${listing.name} Removed from the Watchlist !`);
    } catch (error) {
      console.log("remove:", error.message);
    }
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

  // const [currentPosition, setCurrentPosition] = useState();
  // const [origin, setOrigin] = useState();

  // useEffect(() => {
  //   const getLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(setCurrentPosition);
  //     } else {
  //       console.log("Geolocation not supported by this browser");
  //     }
  //   };

  //   getLocation();
  // }, []);

  // useEffect(() => {
  //   console.log(
  //     `Latitude: ${currentPosition?.coords.latitude}, Longitude: ${currentPosition?.coords.longitude}`
  //   );
  //   setOrigin(
  //     `${currentPosition?.coords.latitude},${currentPosition?.coords.longitude}`
  //   );
  // }, [currentPosition]);

  // useEffect(() => {
  //   console.log("origin", origin);
  // }, [origin]);

  return (
    <>
      <h4 className="title is-4">Listings Component</h4>
      {listings.map((listing) => {
        const inMySubscriptions = mySubscriptions?.includes(listing.id); //listing.id

        return (
          <div className="box" key={listing.id}>
            <Link to={`listing/${listing.id}`}>
              <p>{listing.name}</p>
            </Link>
            <p>{listing.address}</p>
            <p>Distance: Coming Soon</p>
            <p>{listing.category}</p>
            <p>{listing.website}</p>

            {userID && (
              <SubscribeButton
                listing={listing}
                inMySubscriptions={inMySubscriptions}
                addToSubscriptions={addToSubscriptions}
                removeFromSubscriptions={removeFromSubscriptions}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default Listings;
