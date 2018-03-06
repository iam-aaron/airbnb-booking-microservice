import React from 'react';

class CheckButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.startDate,
      endDate: props.endDate  
    };
  }

  // handleClickCheckIn() {

  //   if (!this.state.showCalendar) {
  //     console.log('if');
  //     this.setState({
  //       showCalendar: true,
  //       currentlyChoosingCheckIn: true
  //     });
      
  //   }
  // }

  // handleClickCheckOut() {
  //   console.log('handleClickCheckOut called');
  //   this.setState({
  //     showCalendar: true,
  //     currentlyChoosingCheckIn: false
  //   });

  // }

  render() {
    return (
      <div>
        <button
          onClick={this.props.handleClickCheckIn}>{this.props.startDate}</button>
        <button
          onClick={this.props.handleClickCheckOut}>{this.props.endDate}</button>
      </div>
    );
  }
}

export default CheckButtons;