import React, { useState, useEffect, useRef } from "react";
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
import { Rerousel } from "rerousel";
import styled from "styled-components";

console.log("distance", distance);

function PromosLayout() {
  const customerLogo = useRef(null);

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

  const Item = styled.div`
    margin: 15px;
    padding: 15px;
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    /* width: calc(100% / 2); */
    max-width: 400px;
    /* height: 100px; */
    /* font-family: Signika; */
    font-weight: bold;
    /* font-size: 1.5em; */
    border: solid 1px white;
    background-color: red;
    /* background-color: #61dafb; */

    @media (max-width: 1150px) {
      width: 100%;
    }
  `;

  return (
    <>
      <h4 className="title is-4">PromosLayout Component</h4>

      <Rerousel itemRef={customerLogo}>
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
            <Item className="box" key={promo.id} ref={customerLogo}>
              <Link to={`/listing/${promo.listingID}/promo/${promo.id}`}>
                <p className="has-text-white title is-capitalized">
                  {promo.title}
                </p>
              </Link>
              <p className="has-text-white subtitle mb-0">{promo.subtitle}</p>
              <p className="has-text-white subtitle">{promo.description}</p>
              <p className="is-size-7 has-text-white">Ends:{expirationDate}</p>
            </Item>
          ) : (
            <></>
          );
        })}
      </Rerousel>

      {/* {promos.map((promo) => {
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
      })} */}
    </>
  );
}

export default PromosLayout;
