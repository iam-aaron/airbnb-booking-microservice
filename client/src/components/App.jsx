import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import MyCalendar from './MyCalendar.jsx';
import Guests from './Guests.jsx';
import StarRating from './StarRating.jsx';
import $ from 'jquery';
import ClickOutHandler from 'react-onclickout';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      showGuests: false,
      listingId: props.listingId,
      // availableDays: [],
      // starRating: 0,
      listingInfo: {},
      guests: 1
    };
    this.handleClickCheckIn = this.handleClickCheckIn.bind(this);
    this.handleClickCheckOut = this.handleClickCheckOut.bind(this);
    this.handleCalendarClickOut = this.handleCalendarClickOut.bind(this);
    this.handleGuestsClick = this.handleGuestsClick.bind(this);
    this.handleGuestsClickOut = this.handleGuestsClickOut.bind(this);
    this.closeGuests = this.closeGuests.bind(this);
  }

  componentDidMount() {
    this.getBookingInfo(this.state.listingId);
  }

  handleClickCheckIn() {
    this.setState({
      showCalendar: true
    });
  }

  handleClickCheckOut() {
    this.setState({
      showCalendar: true
    });
  }

  handleCalendarClickOut() {
    this.setState({
      showCalendar: false
    });
  }
  handleGuestsClick() {
    this.setState({
      showGuests: true
    });
  }
  handleGuestsClickOut() {

    this.setState({
      showGuests: false
    });
  }
  closeGuests() {
    this.setState({
      showGuests: false
    });
  }
  getBookingInfo() {
    $.ajax({
      method: 'GET',
      url: `http://127.0.0.1:8080/rooms/${this.props.listingId}/bookings`,
      // params: JSON.stringify(params),
      success: (data) => {
        console.log('Ajax call successful!');
        this.setState({
          listingInfo: (data)
          // listingInfo: JSON.parse(data)
          // availableDays: data.availableDays,
          // starRating: data.star_rating
        });
      },
      error: (err) => {
        console.log('Ajax error!', err);
      }
    });
  }

  render() {
    return (
      <div>

        <div>
          ${this.state.listingInfo.price} per night
        </div>

        <StarRating 
          rating={this.state.listingInfo.star_rating}/><br></br>

        <div>Dates</div>

        <ClickOutHandler onClickOut={this.handleCalendarClickOut}>
          <div>
            <button 
              onClick={this.handleClickCheckIn}>Check-in</button>
            <button
              onClick={this.handleClickCheckOut}>Check-out</button>
          </div>

          {!this.state.showCalendar 
            ? <div>Calendar Not Shown</div>
            : <MyCalendar 
              availableDays={this.state.listingInfo.available_days}/>
          }
        </ClickOutHandler> <br></br>

        <div>

          <div>
            Guests
          </div>

          <button onClick={this.handleGuestsClick}> 
            {this.state.guests} Guests
          </button>

        </div>

        {!this.state.showGuests
          ? <div>Guests Not Shown</div>
          : <ClickOutHandler onClickOut={this.handleGuestsClickOut}>
            <div>    
              <Guests handleClose={this.closeGuests}/>
            </div>
          </ClickOutHandler> 
        }
      </div>
    );
  }
}

export default App;
