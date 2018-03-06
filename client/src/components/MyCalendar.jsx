import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import ClickOutHandler from 'react-onclickout';

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: props.showCalendar,
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

    this.onChange = this.onChange.bind(this);
    this.handleClickDay = this.handleClickDay.bind(this);
    this.updateActiveDays = this.updateActiveDays.bind(this);
  }

  componentDidMount() {
    this.setState({
    });
  }  
  componentWillReceiveProps(nextProps) {
    this.setState({
      availableDays: nextProps.availableDays,
      activeDays: nextProps.availableDays
    });
  }

  onChange(array) {
  }

  handleCheckInClick() {
    this.setState({
      currentlyChoosingCheckIn: true
    });
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
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

    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
  }
  showCalendar(boolean) {
    var modal = document.getElementById('myModal');
    boolean === true ? modal.style.display = 'block' : modal.style.display = 'none';
    this.setState({
    });
  }

  updateActiveDays(clickedDate) {
    var availString = this.state.availableDays.map(x => x.toLocaleDateString());
    var newAvail = [];
    var increment = 1; var decrement = -1;
    var getDatePlus = function(date, i) {
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
        var tempDate = this.state.endDate;
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

          <div className='calendar-button-holder selector-box'>
            <button className='calendar-btn' onClick={this.handleCheckInClick.bind(this)}>
              {
                !this.state.startDate 
                  ? this.state.checkInDisplayText 
                  : this.state.startDate.toLocaleDateString()
              }

            </button>
            <button className='calendar-btn' onClick={this.handleCheckOutClick.bind(this)}>
              {
                !this.state.endDate 
                  ? this.state.checkOutDisplayText 
                  : this.state.endDate.toLocaleDateString()
              }
            </button>
          </div>

          {
            <div id='myModal' className='modal'>

              <Calendar 
                returnValue={'range'}
                calendarType={'US'}
                selectRange={true}
                onClickDay={this.handleClickDay}
                prev2ButtonDisabled={true}
                showNeighboringMonth={false}
                onChange={this.onChange}
                formatS
                tileDisabled={({date}) => {
                if (!this.state.activeDays) return true;
                  return !this.state.activeDays.map((date) => date.toLocaleDateString())
                    .includes(date.toLocaleDateString());
                }}
                value={
                  [this.state.startDate || this.state.endDate || new Date(), 
                    this.state.endDate || this.state.startDate]

                }/> 
              <div className='caption'>
                Minimum stay varies
              </div >
              <div className='caption'>
                Updated today
              </div>

              {this.state.startDate || this.state.endDate 
                ? 
                <button className='clear-dates-btn' onClick={() => this.setState({startDate: null, endDate: null})}>
                  Clear Dates
                </button>
                :
                <div></div>
              }

            </div>
            
            /*:
            <div>Calendar hidden</div>*/
          }
          
        </ClickOutHandler>  

      </div>
    );
  }
}

export default MyCalendar;