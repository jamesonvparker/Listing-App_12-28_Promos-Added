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
import distance from "distance-matrix-api";

console.log("distance", distance);

function Promos() {
  const [promos, setPromos] = useState([]);
  const promosCollectionRef = collection(db, "promos");

  const [userID, setUserID] = useState(localStorage.getItem("app_userId"));

  //Get Promos
  useEffect(() => {
    const getPromos = async () => {
      const data = await getDocs(promosCollectionRef);
      setPromos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPromos();
  }, []);

  useEffect(() => {
    console.log(promos);
  }, [promos]);

  const [currentPosition, setCurrentPosition] = useState();
  const [origin, setOrigin] = useState();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCurrentPosition);
      } else {
        console.log("Geolocation not supported by this browser");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    console.log(
      `Latitude: ${currentPosition?.coords.latitude}, Longitude: ${currentPosition?.coords.longitude}`
    );
    setOrigin(
      `${currentPosition?.coords.latitude},${currentPosition?.coords.longitude}`
    );
  }, [currentPosition]);

  useEffect(() => {
    console.log("origin", origin);
  }, [origin]);

  return (
    <>
      <h4 className="title is-4">Promos Component</h4>
      {promos.map((promo) => {
        const expirationDate = new Date(
          promo.endDate.seconds * 1000
        ).toString();
        const isActive = true;
        //Actual test for isActive here:
        // Date.now() > promo.startDate.seconds * 1000 &&
        // Date.now() < promo.endDate.seconds * 1000;
        console.log(expirationDate, isActive);
        // const inMySubscriptions = mySubscriptions?.includes(listing.id); //listing.id
        // console.log("inMySubs?:", listing.name, inMySubscriptions);
        return isActive ? (
          <div className="box" key={promo.id}>
            <Link to={`/listing/${promo.listingID}/promo/${promo.id}`}>
              <p>{promo.title}</p>
            </Link>
            <p>{promo.subtitle}</p>
            <p>{promo.description}</p>
            <p>Ends:{expirationDate}</p>
          </div>
        ) : (
          <></>
        );
      })}
    </>
  );
}

export default Promos;
