import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import _ from 'underscore';

class PricingTotal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      totalNights: null,
  
      adults: 1,
      children: 0,
      infants: 0,

      price: 0,
      weekendPrice: 0,
      totalNightsPrice: 0,
      longStayDiscount: 0,
      cleaningFee: 0,
      serviceFee: 0,
      occupancyTax: 0,
      totalCost: 0,

    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   cleaningFee: this.props.cleaningFee,
    // });
  }  

  componentWillReceiveProps(nextProps) {
    console.log('current props:', this.props,
      'next props:', nextProps);

    if (nextProps.startDate != null) {
      this.setState({
        startDate: nextProps.startDate,
        endDate: nextProps.endDate,
        adults: nextProps.adults,
        children: nextProps.children,
        infants: nextProps.infants,
        price: nextProps.price,
        weekendPrice: nextProps.weekendPrice
      });
      this.calculateTotals(nextProps.startDate, nextProps.endDate);
    }
  }

  onChange(array) {
    // this.setState({date});
    // console.log(this.state);
  }

  calculateTotals(startDate, endDate) {
    var countWeekendDays = function countWeekendDays(startDay, totalNights) {
      return _.range(startDay.getDay(), startDay.getDay() + totalNights)
        .map((x) => x % 7)
        .filter((x) => (x === 6 || x === 5))
        .length;
    };

    const millisecondsInDay = 86400000;
    let totalNights = Math.round((endDate - startDate) / millisecondsInDay) - 1;
    let weekendDays = countWeekendDays(startDate, totalNights); 
    let weekdayDays = totalNights - weekendDays;

    let totalNightsPrice = this.state.weekendPrice * weekdayDays + this.state.price * weekdayDays;
   
    this.setState({
      totalNightsPrice: totalNightsPrice,
      totalNights: totalNights,
      totalCost: this.state.cleaningFee,
    });

  }

  getOccupanyTax(city) {
    //TO-DO;
    this.setState({
      occupancyTax: 0
    });
  }

  render() {
    let totalNightsPrice; let totalNights; let occupancyTax; let startDate;
    ({totalNights, totalNightsPrice, occupancyTax, startDate} = this.state);
    let nightlyPrice = Math.round((totalNightsPrice / totalNights) * 100) / 100;
    if (!startDate) {
      return null;
    } else {
      return (
        <div>
          <table>
            <tbody>

              <tr>
                <td>$ {nightlyPrice} ⨯ {totalNights} Night{totalNights > 1 ? 's' : null}</td>
                <td>${totalNightsPrice}</td>
              </tr>

              <tr>
                <td>Long stay discount</td>
                <td>${0}</td>
              </tr>

              <tr>
                <td>Cleaning fee</td>
                <td>${this.props.cleaningFee}</td>
              </tr>

              <tr>
                <td>Service fee</td>
                <td>${totalNightsPrice * .05}</td>
              </tr>

              <tr>
                <td>Occupancy taxes</td>
                <td>${occupancyTax} </td>
              </tr>

              <tr>
                <td>Total</td>
                <td>${totalNightsPrice + this.props.cleaningFee + totalNightsPrice * .05 + occupancyTax}</td>
              </tr>

            </tbody>
          </table>

          <div>
            <br></br>
            <button>Book!</button>
            <div>You won't be charged yet</div>
          </div>

        </div>
      );
    }
  }
}

export default PricingTotal;