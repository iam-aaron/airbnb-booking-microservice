import React from 'react';
import ReactDOM from 'react-dom';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adults: 1,
      children: 0,
      infants: 0,
    };
    this.onGuestPickerClick = this.onGuestPickerClick.bind(this);
  }

  onGuestPickerClick(sign, ageGroup, e) {
    let capacity = this.props.personCapacity;
    let currentAdults = this.state.adults;
    let currentChildren = this.state.children;
    let currentInfants = this.state.infants;
    switch(ageGroup) {
    case 'adults':
      this.setState({
        adults: Math.min(Math.max(currentAdults + 1 * sign, 1), capacity - currentChildren)
      });
      this.props.updateGuestsTotal(ageGroup, Math.min(Math.max(currentAdults + 1 * sign, 1), capacity - currentChildren))
      break;
    case 'children':
      this.setState({
        children: Math.min(Math.max(currentChildren + 1 * sign, 0), capacity - currentAdults)
      });     
      this.props.updateGuestsTotal(ageGroup, Math.min(Math.max(currentChildren + 1 * sign, 0), capacity - currentAdults))     
      break;
    case 'infants':
      this.setState({
        infants: Math.min(Math.max(currentInfants + 1 * sign, 0), 5)
      });     
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
                  type='button' value='-' onClick={this.onGuestPickerClick.bind(this, -1, 'adults')}></input>
              </td>
              <td>
                {this.state.adults}
              </td>
              <td>
                <input type='button' value='+' onClick={this.onGuestPickerClick.bind(this, 1, 'adults')}></input>
              </td>
            </tr>

            <tr>
              <td>
                Children 
                <div className='caption'>Ages 2-12</div>
              </td>
              <td>
                <input type='button' value='-' onClick={this.onGuestPickerClick.bind(this, -1, 'children')}></input>
              </td>
              <td>
                {this.state.children}
              </td>
              <td>
                <input type='button' value='+' onClick={this.onGuestPickerClick.bind(this, 1, 'children')}></input>
              </td>
            </tr>

            <tr>
              <td>
              Infants
                <p className='caption'>Under 2</p>
              </td>
              <td>
                <input type='button' value='-' onClick={this.onGuestPickerClick.bind(this, -1, 'infants')}></input>
              </td>
              <td>
                {this.state.infants}
              </td>
              <td>
                <input type='button' value='+' onClick={this.onGuestPickerClick.bind(this, 1, 'infants')}></input>
              </td>
            </tr>

          </tbody>
        </table>


        <p className='caption'>
          {this.props.personCapacity} guests maximum. Infants don’t count toward the number of guests.
        </p>
        
        <button className='guest-close-btn' onClick={this.props.handleClose} align='right'>Close</button>

      </div>
    );
  }
}

export default Guests;
