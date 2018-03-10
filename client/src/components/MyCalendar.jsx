import React from 'react';
import ReactDOM from 'react-dom';
// import Calendar from 'react-calendar';
import Calendar from '../../dist/react-calendar/dist/entry.js';
// import './../../dist/stylesheets/sass/styles.css';
import $ from 'jquery';

import ClickOutHandler from 'react-onclickout';

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInDisplayText: 'Check In',
      startDate: null,
      checkOutDisplayText: 'Check Out',
      endDate: null,
      currentlyChoosingCheckIn: true,
      date: new Date(),
      availableDays: 
        props.availableDays,
      activeDays: 
        props.availableDays,

    };

    this.handleClickDay = this.handleClickDay.bind(this);
    this.updateActiveDays = this.updateActiveDays.bind(this);
  }

  componentDidMount() {

  }  

  componentWillReceiveProps(nextProps) {
    this.setState({
      availableDays: nextProps.availableDays,
      activeDays: nextProps.availableDays
    });
  }


  handleCheckInClick() {
    this.setState({
      currentlyChoosingCheckIn: true,
      startDate: null,
      endDate: null,
    });
    $("#myModal").css("display", "block");
    if (this.state.startDate && this.state.endDate) {
      this.setState({
        startDate: null,
        endDate: null,
      });
    }
  }

  handleCheckOutClick() {
    this.setState({
      currentlyChoosingCheckIn: false,
    });
    if (this.state.endDate) {
      this.updateActiveDays(this.state.startDate);
    }

    $("#myModal").css("display", "block");
  }
  showCalendar(boolean) {
    boolean ? $("#myModal").css("display", "block") : $("#myModal").css("display", "none");;
    this.setState({
    });
  }

  updateActiveDays(clickedDate) {
    let availString = this.state.availableDays.map(x => x.toLocaleDateString());
    let newAvail = [];
    let increment = 1; let decrement = -1;
    let getDatePlus = function(date, i) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
    };
    while (availString.includes(getDatePlus(clickedDate, increment).toLocaleDateString())) {
      newAvail.push(getDatePlus(clickedDate, increment));
      increment++;
    }
    while (availString.includes(getDatePlus(clickedDate, decrement).toLocaleDateString())) {
      newAvail.push(getDatePlus(clickedDate, decrement));
      decrement--;
    }
    this.setState({
      activeDays: newAvail,
    });

    // this.props.triggerPricingTotal([this.state.startDate, this.state.endDate]);
    // this.handleIfStartGreaterThanEnd();
  }
   
  handleIfStartGreaterThanEnd() {
    if (this.state.startDate && this.state.endDate) {
      if (this.state.endDate < this.state.startDate) {
        let tempDate = this.state.endDate;
        this.setState({
          endate: this.state.startDate,
          startDate: tempDate
        });
        this.props.triggerPricingTotal([this.state.endDate, this.state.startDate]);
      } else {
        this.props.triggerPricingTotal([this.state.startDate, this.state.endDate]);
      }
    }
  }

  handleClickDay(date) {
      // debugger;
    if (this.state.currentlyChoosingCheckIn) { // curr choosing check in
      if (this.state.startDate) {
        this.setState({
          endDate: null,
          startDate: date,
          currentlyChoosingCheckIn: false,
        });
      }

      else if (this.state.endDate) {
        this.state.endDate < date //check if should switch
          ? this.setState({startDate: this.state.endDate, endDate: date})
          : null;
        this.showCalendar(false);
        this.setState({startDate: date});
        this.props.triggerPricingTotal(date, this.state.endDate);


      } else {
        this.setState({
          startDate: date,
          currentlyChoosingCheckIn: false,
        });
        this.updateActiveDays(date);
      }
    } 


    else { // curr choosing check out

      this.setState({
        endDate: date,
      });

      if (this.state.startDate) { // if you just chose out, and in exists
        this.state.startDate > date //check if should switch
          ? this.setState({startDate: date, endDate: this.state.startDate})
          : null;
        this.showCalendar(false);
        this.props.triggerPricingTotal(this.state.startDate, date);


      } else { // just chose out, haven't chosen in
        this.setState({currentlyChoosingCheckIn: true});
        this.updateActiveDays(date);
      }
    }
  }

  render() {
    return (
      <div className='calendar-container'>

        <ClickOutHandler onClickOut={this.showCalendar.bind(this, false)}>  

          <div>
            <button className='calendar-btn align-right' onClick={this.handleCheckInClick.bind(this)}>
              {
                !this.state.startDate 
                  ? this.state.checkInDisplayText 
                  : this.state.startDate.toDateString().slice(3, 10)
              }

            </button>
            <button className='calendar-btn align-left' onClick={this.handleCheckOutClick.bind(this)}>
              {
                !this.state.endDate 
                  ? this.state.checkOutDisplayText 
                  : this.state.endDate.toDateString().slice(3, 10)
              }
            </button>
          </div>

          
          <div id='myModal'>

            <Calendar 
              minDetail={'month'}
              returnValue={'range'}
              calendarType={'US'}
              selectRange={false}
              onClickDay={this.handleClickDay}
              prev2ButtonDisabled={true}
              showNeighboringMonth={false}

              tileDisabled={({date}) => {
                if (!this.state.activeDays) return true;
                return !this.state.activeDays.map((date) => date.toLocaleDateString())
                  .includes(date.toLocaleDateString());
              }}
              value={
                [this.state.startDate || this.state.endDate || new Date(), 
                  this.state.endDate || this.state.startDate]

              }/> 
            <div className='caption padding-left padding-top'>
              Minimum stay varies
            </div>
            <div className='caption padding-left'>
              Updated today
            </div>

            {this.state.startDate || this.state.endDate 
              ? 
              <button className='clear-dates-btn' onClick={() => 
                  this.setState({
                    startDate: null, 
                    endDate: null, 
                    activeDays: this.state.availableDays,
                    currentlyChoosingCheckIn: true
                  })}>
                <span style={{'float': 'right'}}>
                Clear Dates
                </span>

              </button>
              :
              <div>
                
              </div>
            }

          </div>
          
        </ClickOutHandler>  

        

      </div>
    );
  }
}

export default MyCalendar;