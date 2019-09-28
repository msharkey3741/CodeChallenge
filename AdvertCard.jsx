import React from "react";
import propTypes from "prop-types";

const AdvertCard = props => {
  console.log(props);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.advert.title}</h5>
        <hr />
        <div>{props.advert.id}</div>
        <div>{props.advert.shortDescription}</div>
        <div>{props.advert.address}</div>
        <div>{props.advert.zipCode}</div>
      </div>
      <button>View More</button>
    </div>
  );
};
export default AdvertCard;

AdvertCard.propTypes = {
  advert: propTypes.any,
  viewMore: propTypes.func
};
