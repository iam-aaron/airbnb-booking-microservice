import React from 'react';
import ReactDOM from 'react-dom';
import ReactStarRating from 'react-star-rating-component';

var StarRating = (props) => (

  <ReactStarRating 
    editing={false}
    emptyStarColor="#E3E3E3"
    name="rating"
    starColor="#238A88"
    starCount={5}
    value={props.rating}
  />
  
);

export default StarRating;