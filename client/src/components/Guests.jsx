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
    this.onSignClick = this.onSignClick.bind(this);
  }

  onSignClick(e) {
    let delta = e.target.value === '+' ? 1 : -1; 
    let ageGroup = e.target.parentNode.className.slice(7);
    this.setState({});
    let min = ageGroup === 'adults' ? 1 : 0;
    this.state[ageGroup] = Math.max(min, this.state[ageGroup] + delta);
    this.props.updateGuestsTotal(ageGroup, this.state[ageGroup]);
  }

  render() {
    return (
      <div id='guestsBox'>

        <br></br>
        <div className='guests-adults'>
          <span>Adults</span>
          <input type='button' value='-' onClick={this.onSignClick}></input>
          <span>{this.state.adults}</span>
          <input type='button' value='+' onClick={this.onSignClick}></input>
        </div> 

        <div className='guests-children'>
          <span>Children</span>
          <input type='button' value='-' onClick={this.onSignClick}></input>
          <span>{this.state.children}</span>
          <input type='button' value='+' onClick={this.onSignClick}></input>
        </div>
        
        <div className='guests-infants'>
          <span>Infants</span>
          <input type='button' value='-' onClick={this.onSignClick}></input>
          <span>{this.state.infants}</span>
          <input type='button' value='+' onClick={this.onSignClick}></input>
        </div>

        <br></br>
        <button onClick={this.props.handleClose}>Close</button>

      </div>
    );
  }
}

export default Guests;
