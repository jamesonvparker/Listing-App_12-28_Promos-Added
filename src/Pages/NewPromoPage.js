import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  where,
  doc,
  getDoc
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewPromoPage({ handleTagging }) {
  const [promoTypes, setPromoTypes] = useState([]);
  const promoTypesCollectionRef = collection(db, "promoTypes");
  const promosCollectionRef = collection(db, "promos");
  const listingsCollectionRef = collection(db, "listings");
  const listingID = useParams("id").id;
  const [listing, setListing] = useState();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [promoType, setPromoType] = useState();
  const [adminID, setAdminID] = useState(localStorage.getItem("app_userId"));
  const [subtitle, setSubtitle] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [category, setCategory] = useState();

  const navigate = useNavigate();

  // const q = query(listingsCollectionRef, where("listingID", "==", listingID)); //Only gets listings created by logged in user

  useEffect(() => {
    const getListing = async () => {
      const docRef = doc(db, "listings", listingID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing({ ...docSnap.data(), id: listingID });
        setCategory(docSnap.data().category);
        // setIsMyListing(id == userID)
      } else {
        console.log("No such document");
      }
    };

    getListing();
  }, []);

  useEffect(() => {
    console.log("category", category);
  }, [category]);

  const promoTypesQuery = query(promoTypesCollectionRef, orderBy("name"));

  useEffect(() => {
    console.log(startDate);
    console.log("listing id", listingID);
  }, [startDate]);

  useEffect(() => {
    console.log(endDate);
  }, [endDate]);

  useEffect(() => {
    const getPromoTypes = async () => {
      const data = await getDocs(promoTypesQuery);
      setPromoTypes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPromoTypes();
  }, []);

  useEffect(() => {
    console.log(promoTypes);
  }, [promoTypes]);

  useEffect(() => {
    console.log(promoType);
  }, [promoType]);

  const create = async () => {
    const newPromo = await addDoc(promosCollectionRef, {
      listingID,
      name,
      title,
      subtitle,
      promoType,
      description,
      startDate,
      endDate,
      adminID,
      category
    });

    console.log("new", newPromo);
    console.log({
      listingID,
      name,
      title,
      subtitle,
      promoType,
      description,
      startDate,
      endDate,
      adminID,
      category
    });
    handleTagging("promotion");
    navigate("/my-account/listings");
  };

  return (
    <>
      <h3>NewPromoPage</h3>
      <div className="new-promo-form">
        <h3>Create New Promo for : Listing Name</h3>
        <input
          className="input is-info mb-5"
          type="text"
          placeholder="Promo Name"
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <input
          className="input is-info mb-5"
          type="text"
          placeholder="Promo Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className="input is-info mb-5"
          type="text"
          placeholder="Promo Subtitle"
          onChange={(event) => setSubtitle(event.target.value)}
        />
        <br />
        <div className="select is-info mb-5">
          <select onChange={(event) => setPromoType(event.target.value)}>
            <option value="select">Select Promo Type</option>
            {/* Map All Values */}
            {promoTypes.map((pType) => {
              return (
                <option
                  key={pType.id}
                  value={pType.name}
                  disabled={pType.name === "video"}
                >
                  {pType.name}
                </option>
              );
            })}
          </select>
        </div>
        <textarea
          className="textarea is-info mb-5"
          placeholder="Promo Detailed Description"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <strong>Promo Start Date</strong>
        <br />
        {/* <input type="datetime" data-display-mode="inline" data-is-range="true" data-close-on-select="false"/> */}
        {/* https://www.npmjs.com/package/react-datepicker */}
        <DatePicker
          // showTimeSelect
          inline
          selected={startDate}
          selectsStart
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yy h:mm aa"
        />

        <strong>Promo End Date</strong>
        <br />
        <DatePicker
          // showTimeSelect
          inline
          selected={endDate}
          selectsEnd
          minDate={startDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="MM/dd/yy h:mm aa"
        />
        <button className="button is-info" onClick={create}>
          Create Promo
        </button>
      </div>
    </>
  );
}

export default NewPromoPage;
