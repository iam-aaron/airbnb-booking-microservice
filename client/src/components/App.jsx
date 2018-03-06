import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Calendar from 'react-calendar';
import ClickOutHandler from 'react-onclickout';
import StarRating from './StarRating.jsx';
import MyCalendar from './MyCalendar.jsx';
import Guests from './Guests.jsx';
import PricingTotal from './PricingTotal.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      showGuests: false,
      listingId: props.listingId,
      listingInfo: {},
      adults: 1,
      children: 0,
      infants: 0,
      totalGuests: 1,
      startDate: new Date(),
      endDate: null,
      showPricing: false,
    };
    this.handleGuestsClick = this.handleGuestsClick.bind(this);
    this.updateGuestsTotal = this.updateGuestsTotal.bind(this);
    this.triggerPricingTotal = this.triggerPricingTotal.bind(this);
  }

  componentDidMount() {
    this.getBookingInfo(this.state.listingId);
  }

  handleGuestsClick(boolean) {
    this.setState({
      showGuests: boolean
    });
  }

  getBookingInfo() {
    $.ajax({
      method: 'GET',
      url: `http://127.0.0.1:3003/rooms/${this.props.listingId}/bookings`,
      success: (data) => {
        console.log('Ajax success!');
        let dates = data.available_days.map( x => new Date(x));
        data.available_days = dates;
        this.setState({
          listingInfo: data
        });

      },
      error: (err) => {
        console.log('Ajax error!', err);
      }
    });
  }

  updateGuestsTotal(ageGroup, total) {
    this.state[ageGroup] = total;
    this.setState({
      totalGuests: this.state.adults 
        + this.state.children
    });
  }

  triggerPricingTotal(start, end) {
    this.setState({
      showPricing: true,
      startDate: start,
      endDate: end,
    });
  }

  render() {
    return (
      <div className="app-container">
        
        <div className='price-and-rating'>
          <span className='header'>${this.state.listingInfo.price}</span>
          <span className='caption'> per night</span>
        </div>

        <a href='#'>
          <StarRating 
            rating={this.state.listingInfo.star_rating}/>
          <span className='caption'>{this.state.listingInfo.reviews_count}</span>
        </a>


        <div className='caption'>
          Dates
        </div>

        <MyCalendar 
          availableDays={this.state.listingInfo.available_days}
          showCalendar={this.state.showCalendar}
          triggerPricingTotal={this.triggerPricingTotal}
        />

        <br></br>
        <div> 
          <div>

            <div className='caption'>Guests
            </div>
            <button className='selector-box' onClick={this.handleGuestsClick.bind(this, true)}> 
              {this.state.totalGuests} Guest{this.state.totalGuests > 1 ? 's' : null}
            </button>
          </div>
          {!this.state.showGuests
            ? <div></div>
            : <ClickOutHandler onClickOut={this.handleGuestsClick.bind(this, false)}>
              <div>    
                <Guests 
                  personCapacity={this.state.listingInfo.person_capacity}
                  handleClose={this.handleGuestsClick.bind(this, false)}
                  updateGuestsTotal={this.updateGuestsTotal}
                  />
              </div>
            </ClickOutHandler> 
          }
        </div> 

        <br></br>
        <PricingTotal 
          showPricing={this.state.showPricing}
          adults={this.state.adults}
          children={this.state.children}
          infants={this.state.infants}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          price={this.state.listingInfo.price}
          weekendPrice={this.state.listingInfo.listing_weekend_price_native === null 
            ? this.state.listingInfo.price 
            : this.state.listingInfo.listing_weekend_price_native}
          cleaningFee={this.state.listingInfo.cleaning_fee_native}
          listingPriceForExtraPerson={this.state.listing_price_for_extra_person_native}
          city={this.state.listingInfo.city}
          weeklyPriceFactor={this.state.weekly_price_factor}
        />

        <div className='book-now'>
          <button >Book</button>
          <div className='caption'>You won't be charged yet</div>
        </div>

      </div>
    );
  }
}

export default App;
