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
    let change;
    e.target.value === '+' ? change = 1 : change = -1; 
    let whichStateToChange = e.target.parentNode.className.slice(7);
    this.setState({
      adults: Math.max(1, this.state.adults + change)
    });
  }

  render() {
    return (
      <div id='guestsBox'>

        <br></br>
        <div className='guests-adults'>
          <span>Adults</span>
          <input type='button' value='-' onClick={this.onSignClick}></input>
          <input type='button' value='+' onClick={this.onSignClick}></input>
        </div> 

        <div className='guests-children'>
          <span>Children</span>
          <input type='button' value='-' onClick={this.onSignClick}></input>
          <input type='button' value='+' onClick={this.onSignClick}></input>
        </div>
        
        <div className='guests-infants'>
          <span>Infants</span>
          <input type='button' value='-' onClick={this.onSignClick}></input>
          <input type='button' value='+' onClick={this.onSignClick}></input>
        </div>

        <br></br>
        <button onClick={this.props.handleClose}>Close</button>

      </div>

    );
  }

}

export default Guests;
