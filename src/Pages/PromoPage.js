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
import Countdown, { calcTimeDelta } from "react-countdown";

function PromoPage() {
  const [userID, setUserID] = useState(localStorage.getItem("app_userId"));
  const [listing, setListing] = useState([]);
  const [promo, setPromo] = useState([]);
  const { id, promoId } = useParams();
  const [isMyListing, setIsMyListing] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [countDownEnd, setCountDownEnd] = useState(0);

  useEffect(() => {
    const getListing = async () => {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing({ ...docSnap.data(), id: id });
        // setIsMyListing(id == userID)
      } else {
        console.log("No such listing document");
      }
    };

    const getPromo = async () => {
      const docRef = doc(db, "promos", promoId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setPromo({ ...docSnap.data(), id: id });
        setStartDate(
          new Date(docSnap.data().startDate.seconds * 1000).toString()
        );
        setEndDate(new Date(docSnap.data().endDate.seconds * 1000).toString());
        setCountDownEnd(docSnap.data().endDate.seconds * 1000);
        setIsActive(
          Date.now() > docSnap.data().startDate.seconds * 1000 &&
            Date.now() < docSnap.data().endDate.seconds * 1000
        );
        // setStartDate(new DateTime.fromMillisecondsSinceEpoch(docSnap.data().startDate.seconds)
      } else {
        console.log("No such promo document");
      }
    };

    getListing();
    getPromo();
  }, []);

  useEffect(() => {
    setIsMyListing(userID === listing.adminID);
  }, [userID, listing]);

  return (
    <>
      <h3 className="title is-3">Listing's Promo Details Page</h3>
      <p>{listing.name}</p>
      <p>{listing.address}</p>
      <p>{listing.phoneNumber}</p>
      <p>{listing.category}</p>
      <p>{listing.website}</p>

      <h3 className="title is-3">Promo Details</h3>
      <p>
        <strong>Promo name: </strong>
        {promo.name}
      </p>
      <p>
        <strong>Promo title: </strong>
        {promo.title}
      </p>
      <p>
        <strong>Promo subtitle: </strong>
        {promo.subtitle}
      </p>
      <p>
        <strong>Promo category: </strong>
        {promo.category}
      </p>
      {/* {console.log(new Date(promo?.startDate?.seconds * 1000))} */}
      <p>
        <strong>Start Date:</strong> {startDate}
      </p>
      <p>
        <strong>End Date:</strong> {endDate}
      </p>
      {console.log("test", countDownEnd)}

      <p>
        <strong>Time left until Promo Ends</strong>
        {/* https://www.npmjs.com/package/react-countdown */}
        <Countdown
          key={countDownEnd}
          date={countDownEnd}
          precision={3}
          intervalDelay={1000}
          renderer={(props) => (
            <p>
              {props.days} days, {props.hours} hours, {props.minutes} minutes,
              {props.seconds} seconds
            </p>
          )}
        />
        {console.log(calcTimeDelta(countDownEnd))}
      </p>
      <p>
        <strong>Promo Status:</strong> {isActive ? "Active" : "InActive"}
      </p>
      {isMyListing ? (
        <button className="button is-info has-text-weight-bold mt-2">
          Unpublish Promo{" "}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default PromoPage;
