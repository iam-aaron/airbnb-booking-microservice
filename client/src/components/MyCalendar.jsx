import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import ClickOutHandler from 'react-onclickout';
import CheckButtons from './CheckButtons.jsx';

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: props.showCalendar,
      checkIn: 'Check In',
      startDate: null,
      checkOut: 'Check Out',
      endDate: null,
      currentlyChoosingCheckIn: true,
      date: new Date(),
      availableDays:
        props.availableDays,
      // ['2/27/2018', '2/28/2018', '3/1/2018', '3/4/2018', '3/5/2018',
      //   '3/6/2018', '3/7/2018', '3/10/2018', '3/11/2018', '3/12/2018'],
      // [new Date(2018, 2, 7), new Date(2018, 2, 8), new Date(2018, 2, 9),
      //   new Date(2018, 2, 11), new Date(2018, 2, 12), new Date(2018, 2, 13)],

      activeDays:
        props.availableDays,

      // [new Date(2018, 2, 7), new Date(2018, 2, 8), new Date(2018, 2, 9),
      // new Date(2018, 2, 11), new Date(2018, 2, 12), new Date(2018, 2, 13)],
    };

    this.onChange = this.onChange.bind(this);
    this.handleClickDay = this.handleClickDay.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
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
    // this.validate
    // this.setState({
    //   // startDate: array[0],
    //   // endDate: array[1],
    //   showCalendar: false
    // });

    this.props.triggerPricingTotal(array);
  }

  showCalendar(boolean, inOrOut) {
    this.setState({
      showCalendar: boolean,
      currentlyChoosingCheckIn: inOrOut === 'in' ? true : false
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

    if (this.state.currentlyChoosingCheckIn) {
      this.setState({
        startDate: clickedDate,
        currentlyChoosingCheckIn: false,
      });
    } else {
      this.setState({
        endDate: clickedDate,
        showCalendar: false,
      });
    }


    // this.props.triggerPricingTotal([this.state.startDate, this.state.endDate]);
    this.handleIfStartGreaterThanEnd();
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
    this.updateActiveDays(date);
  }

  render() {
    return (
      <div>

        <ClickOutHandler onClickOut={this.showCalendar.bind(this, false)}>

          <button onClick={this.showCalendar.bind(this, true, 'in')}>
            {!this.state.startDate
              ? this.state.checkIn
              : this.state.startDate.toLocaleDateString()
            }</button>
          <button onClick={this.showCalendar.bind(this, true, 'out')}>
            {!this.state.endDate
              ? this.state.checkOut
              : this.state.endDate.toLocaleDateString()
            }</button>

          {this.state.showCalendar === true
            ?
            <Calendar
              returnValue={'range'}
              calendarType={'US'}
              selectRange={true}
              onClickDay={this.handleClickDay}
              prev2ButtonDisabled={true}
              showNeighboringMonth={false}
              onChange={this.onChange}
              tileDisabled={({date}) => {
                return !this.state.activeDays.map((date) => date.toLocaleDateString())
                  .includes(date.toLocaleDateString());
              }}
              activeStartDate={!this.state.startDate ? new Date() : this.state.startDate}
              value={[
                (!this.state.startDate ? new Date() : this.state.startDate),
                (!this.state.endDate ? null : this.state.endDate)
              ]}/>
            :
            <div>Calendar hidden</div>
          }

        </ClickOutHandler>

      </div>
    );
  }
}

export default MyCalendar;