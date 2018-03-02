import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showCalendar: props.showCalendar,
      // activeStartDate:
      date: new Date(),
      availableDays: 
      // [],
      // props.availableDays
      ['2/27/2018', '2/28/2018', '3/1/2018', '3/4/2018', '3/5/2018']
    };
    // this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    this.setState({
      //availableDays: this.props.availableDays
    });
  }  

  onChange(array) {
    // this.setState({date});
    console.log('on change: ', 
      array[0].toLocaleDateString(), 
      array[1].toLocaleDateString()
    );
  }

  handleClickDay(date) {
    console.log('on clickDay: ', date.toLocaleDateString());
  }


  render() {
    return (

      <div>

        <Calendar 
          // tileClassName={ ({date, view}) => {
          //   this.state.availableDays.includes(date.toLocaleDateString()) ? 'available' : 'unavailable'
          // }}
          tileDisabled={ ({date, view}) => {
            if (!this.props.availableDays) {
              date;
            } else {
              !this.state.availableDays.includes(date.toLocaleDateString());
            }
          }

          }
          // tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null}
          returnValue={'range'}
          calendarType={'US'}
          selectRange={true}
          onClickDay={this.handleClickDay}
          prev2ButtonDisabled={true}
          showNeighboringMonth={false}
          onChange={this.onChange}
          value={null}
        />
      </div>
    );
  }
}

export default MyCalendar;