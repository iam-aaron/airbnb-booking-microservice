import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ClickOutHandler from 'react-onclickout';
import StarRating from './StarRating.jsx';
import MyCalendar from './MyCalendar.jsx';
import Guests from './Guests.jsx';
import PricingTotal from './PricingTotal.jsx';
import './../../dist/stylesheets/sass/styles.css';

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
    boolean 
    ? $('#guest-modal').css('display', 'block') 
    : $('#guest-modal').css('display', 'none');
  }

  getBookingInfo() {
    $.ajax({
      method: 'GET',
      url: `/api/rooms/${this.props.listingId}/bookings`,
      success: (data) => {
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
      <div className="bookings-app-container">
        
        <div className='price-and-rating'>
          <span className='price-header'>${this.state.listingInfo.price}</span>
          <span className='caption'> per night</span>
        </div>

        <a className='star-rating-link' href='#'>
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

              <ClickOutHandler onClickOut={this.handleGuestsClick.bind(this, false)}>
          <div>

            <div className='caption'>Guests
            </div>
            <button className='guest-btn' onClick={this.handleGuestsClick.bind(this, true)}> 
              {this.state.totalGuests} Guest{this.state.totalGuests > 1 ? 's' : null}
            </button>
          </div>


            <div className='guest-modal-container'>

              <div id='guest-modal'>    
                <Guests 
                  personCapacity={this.state.listingInfo.person_capacity}
                  handleClose={this.handleGuestsClick.bind(this, false)}
                  updateGuestsTotal={this.updateGuestsTotal}
                />
              </div>
            </div>

            </ClickOutHandler> 

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

        <br></br>
        <br></br>

        <div className='on-peoples-minds caption top-border'>
          <img className='icon' src='https://a0.muscache.com/airbnb/static/page3/icon-uc-light-bulb-b34f4ddc543809b3144949c9e8cfcc8d.gif'
            align='right' 
          ></img>
          <span className='bold'>This home is on people’s minds.</span><br></br>
          <span>It’s been viewed { Math.round(this.state.listingInfo.reviews_count / 100) * 100 > 0 
            ? Math.round(this.state.listingInfo.reviews_count / 100) * 100
            : 'lots of'
          } times in the past week.</span>

        </div>
        <br></br>
    
        <div align="center">
          <img  className="icon-small" src='https://image.flaticon.com/icons/svg/149/149262.svg'></img>
            <span 
              className='caption link thin'>Report this listing


            </span>
        </div>
                                           


      </div>


    );
  }
}

export default App;
