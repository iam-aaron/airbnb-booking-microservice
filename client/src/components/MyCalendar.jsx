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
      startDate: 'Check-in',
      endDate: 'Check-out',
      currentlyChoosingCheckIn: true,
      date: new Date(),
      availableDays: 
      // props.availableDays
      ['2/27/2018', '2/28/2018', '3/1/2018', '3/4/2018', '3/5/2018', 
      '3/6/2018', '3/7/2018', '3/10/2018', '3/11/2018', '3/12/2018']
    };
    this.onChange = this.onChange.bind(this);
    this.handleClickDay = this.handleClickDay.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
  }

  componentDidMount() {
    this.setState({
      // availableDays: this.props.availableDays
    });
  }  

  onChange(array) {
    this.setState({
      startDate: array[0],
      endDate: array[1],
      showCalendar: false
    });
    this.props.triggerPricingTotal(array);
  }

  showCalendar(boolean) {
    this.setState({
      showCalendar: boolean,
    });
  }

  handleClickDay(date) {
    console.log('clicked day was ', date);
  }

  render() {
    return (
      <div>

        <ClickOutHandler onClickOut={this.showCalendar.bind(this, false)}>  

          <button onClick={this.showCalendar.bind(this, true)}>
            {this.state.startDate === 'Check-in' 
              ? this.state.startDate 
              : this.state.startDate.toLocaleDateString()
            }</button>
          <button onClick={this.showCalendar.bind(this, true)}>
            {this.state.endDate === 'Check-out' 
              ? this.state.endDate 
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
              tileDisabled={({date, view}) => {
                return !this.state.availableDays.includes(date.toLocaleDateString());
              }}
              value={[
                (this.state.startDate === 'Check-in' ? new Date() : this.state.startDate), 
                (this.state.endDate === 'Check-out' ? null : this.state.endDate)
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