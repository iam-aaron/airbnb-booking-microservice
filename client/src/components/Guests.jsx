import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adults: 1,
      children: 0,
      infants: 0,
      atCapacity: false,

    };
    this.onGuestPickerClick = this.onGuestPickerClick.bind(this);
  }
  componentDidMount() {
    if (this.props.personCapacity === 1) {
      this.setState({atCapacity: true});
    }
    $("#adult-minus-btn").css("border", "1px solid #b2d7db");
    $("#children-minus-btn").css("border", "1px solid #b2d7db");
    $("#infants-minus-btn").css("border", "1px solid #b2d7db");

  }
  onGuestPickerClick(sign, ageGroup, e) {
    let capacity = this.props.personCapacity;
    let currentAdults = this.state.adults;
    let currentChildren = this.state.children;
    let currentInfants = this.state.infants;
    switch(ageGroup) {
    case 'adults':
      let adultsTotal = Math.min(Math.max(currentAdults + 1 * sign, 1), capacity - currentChildren);
      this.setState({
        adults: adultsTotal
      });
      this.props.updateGuestsTotal(ageGroup, adultsTotal);
      if (adultsTotal === 1) {
        $("#adult-minus-btn").css("border", "1px solid #b2d7db"); 
      }
      if (adultsTotal > 1) {
        $("#adult-minus-btn").css("border", "1px solid #007a87");
      }
      if (currentChildren + adultsTotal === capacity) {
        $("#adult-plus-btn").css("border", "1px solid #b2d7db");
        $("#children-plus-btn").css("border", "1px solid #b2d7db");
      } else {
        $("#adult-plus-btn").css("border", "1px solid #007a87");
        $("#children-plus-btn").css("border", "1px solid #007a87");

      }

      break;
    case 'children':
      let childrenTotal = Math.min(Math.max(currentChildren + 1 * sign, 0), capacity - currentAdults);
      this.setState({
        children: childrenTotal
      });     
      this.props.updateGuestsTotal(ageGroup, Math.min(Math.max(currentChildren + 1 * sign, 0), capacity - currentAdults))     
      if (childrenTotal === 0) {
        $("#children-minus-btn").css("border", "1px solid #b2d7db"); 
      }
      if (childrenTotal > 0) {
        $("#children-minus-btn").css("border", "1px solid #007a87"); 
      }
      if (currentAdults + childrenTotal === capacity) {
        $("#adult-plus-btn").css("border", "1px solid #b2d7db");
        $("#children-plus-btn").css("border", "1px solid #b2d7db");
      } else {
        $("#adult-plus-btn").css("border", "1px solid #007a87");
        $("#children-plus-btn").css("border", "1px solid #007a87");
      }
      break;
    case 'infants':
      let infantsTotal = Math.min(Math.max(currentInfants + 1 * sign, 0), 5);
      this.setState({
        infants: infantsTotal
      });   
      if (infantsTotal === 0) {
        $("#infants-minus-btn").css("border", "1px solid #b2d7db");
      } else if (infantsTotal < 5) {
        $("#infants-minus-btn").css("border", "1px solid #007a87");
        $("#infants-plus-btn").css("border", "1px solid #007a87");
      } else {
        $("#infants-plus-btn").css("border", "1px solid #b2d7db");
      }
      break;
    }
  }

  render() {
    return (
      <div className='guest-picker-container'>

        <table className='guest-picker'>
          <tbody>
       
            <tr>
              <td>
              Adults
              </td>
              <td>
                <input 
                  type='button' value='-' id='adult-minus-btn' onClick={this.onGuestPickerClick.bind(this, -1, 'adults')}></input>
              </td>
              <td>
                {this.state.adults}
              </td>
              <td>
                <input type='button' value='+' id='adult-plus-btn' onClick={this.onGuestPickerClick.bind(this, 1, 'adults')}></input>
              </td>
            </tr>

            <tr>
              <td>
                Children 
                <div className='caption'>Ages 2-12</div>
              </td>
              <td>
                <input type='button' value='-' id='children-minus-btn' onClick={this.onGuestPickerClick.bind(this, -1, 'children')}></input>
              </td>
              <td>
                {this.state.children}
              </td>
              <td>
                <input type='button' value='+' id='children-plus-btn' onClick={this.onGuestPickerClick.bind(this, 1, 'children')}></input>
              </td>
            </tr>

            <tr>
              <td>
              Infants
                <div className='caption'>Under 2</div>
              </td>
              <td>
                <input type='button' value='-' id='infants-minus-btn' onClick={this.onGuestPickerClick.bind(this, -1, 'infants')}></input>
              </td>
              <td>
                {this.state.infants}
              </td>
              <td>
                <input type='button' value='+' id='infants-plus-btn' onClick={this.onGuestPickerClick.bind(this, 1, 'infants')}></input>
              </td>
            </tr>

          </tbody>
        </table>

        <div>

        <p className='caption'>
          {this.props.personCapacity} guests maximum. Infants don’t count toward the number of guests.
        </p>
        
        <button className='guest-close-btn' onClick={this.props.handleClose} >Close</button>

        </div>
      </div>
    );
  }
}

export default Guests;
