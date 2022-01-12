import React from "react";

const SubscribeButton = ({
  listing,
  inMySubscriptions,
  addToSubscriptions,
  removeFromSubscriptions
}) => {
  return (
    <nav className="level is-mobile ">
      <div className="level-right">
        <div
          className="level-item"
          onClick={() => {
            inMySubscriptions
              ? removeFromSubscriptions(listing)
              : addToSubscriptions(listing);
          }}
        >
          <span className="icon is-red is-small">
            {inMySubscriptions ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default SubscribeButton;
