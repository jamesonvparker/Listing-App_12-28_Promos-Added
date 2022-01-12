import React from "react";
import Listings from "../components/Listings";
import Promos from "../components/Promos";
import PromosLayout from "../components/PromosLayout";

function HomeLayout() {
  return (
    <>
      <h3>Home Layout</h3>
      <PromosLayout />
      <Listings />
    </>
  );
}

export default HomeLayout;
