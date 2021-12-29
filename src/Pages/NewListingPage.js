import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function NewListingPage() {
  const [categories, setCategories] = useState([]);
  const categoriesCollectionRef = collection(db, "categories");
  const listingsCollectionRef = collection(db, "listings");

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [category, setCategory] = useState();
  const [adminID, setAdminID] = useState(localStorage.getItem("app_userId"));
  const [website, setWebsite] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const categoriesQuery = query(categoriesCollectionRef, orderBy("name"));

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoriesQuery);
      setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    console.log(category);
  }, [category]);

  const create = async () => {
    const newListing = await addDoc(listingsCollectionRef, {
      name,
      address,
      category,
      adminID,
      website,
      phoneNumber,
      email,
      description
    });

    console.log("new", newListing);
    console.log({
      name,
      address,
      category,
      adminID,
      website,
      phoneNumber,
      email,
      description
    });
    navigate("/my-account/listings");
  };

  return (
    <>
      <h3>NewListingPage</h3>
      <div className="new-listing-form">
        <h3>Create New Listing</h3>
        <input
          className="input is-info mb-5"
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <input
          className="input is-info mb-5"
          type="text"
          placeholder="Address"
          onChange={(event) => setAddress(event.target.value)}
        />
        <br />
        <div className="select is-info mb-5">
          <select onChange={(event) => setCategory(event.target.value)}>
            <option value="select">Select Category</option>
            {/* Map All Values */}
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>

        <input
          className="input is-info mb-5"
          type="text"
          placeholder="Phone Number"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <br />
        <input
          className="input is-info mb-5"
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          className="input is-info mb-5"
          type="text"
          placeholder="Website Address"
          onChange={(event) => setWebsite(event.target.value)}
        />
        <br />
        <textarea
          className="textarea is-info mb-5"
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <button className="button is-info" onClick={create}>
          Create Listing
        </button>
      </div>
    </>
  );
}

export default NewListingPage;
