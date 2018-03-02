import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

class StarRating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 
      null
      // props.rating
    };
  }

  componentDidMount() {
    this.setState({
      rating: this.props.rating
    });
  }

  render() {
    return (                
      <div
        style={{
          'outlineStyle': 'solid', 
          'outlineWidth': '1px',
          'outlineColor': 'grey'
        }}>

        <StarRatingComponent 
          editing={false}
          starCount={5}
          value={this.state.rating}
          name='rating'
        />
        <span>{}# Ratings</span>
      </div>
    );
  }
}
export default StarRating;
