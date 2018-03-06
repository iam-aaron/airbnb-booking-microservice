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
      occupancyTaxPercentage: 0,
      totalCost: 0,
      weeklyPriceFactor: 0.83,


    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getOccupanyTaxPercentage(this.props.city);
  }

  componentWillReceiveProps(nextProps) {
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

  getOccupanyTaxPercentage(city) {
    //TO-DO;
    let percent = 0.075;
    this.setState({
      occupancyTaxPercentage: percent
    });
  }

  render() {
    let totalNightsPrice; let totalNights; let occupancyTaxPercentage; let startDate;
    ({totalNights, totalNightsPrice, occupancyTaxPercentage, startDate} = this.state);
    let nightlyPrice = Math.round((totalNightsPrice / totalNights) * 100) / 100;


    if (!startDate) {
      return null;
    } else {
      return (
        <div>
          <table>
            <tbody>

              <tr>
                <td>$ {Math.round(nightlyPrice)} ⨯ {totalNights} Night{totalNights > 1 ? 's' : null}
                </td>
                <td>${Math.round(totalNightsPrice)}
                </td>
              </tr>

              <tr>
                <td>Long stay discount
                </td>
                <td>${Math.round(totalNights > 4 ? this.props.weeklyPriceFactor * -totalNightsPrice : 0)}</td>
              </tr>

              <tr>
                <td>Cleaning fee
                <div className='help-tip'>
                  <p>One time fee charged by host to cover the cost of cleaning their space.
                  </p>
                </div>
                </td>
                <td>${this.props.cleaningFee}
                </td>
              </tr>

              <tr>
                <td>Service fee

                <div className='help-tip'>
                  <p>This helps us run our platform and offer services like 24/7 support on your trip.
                  </p>
                </div>

                </td>
                <td>${Math.round(totalNightsPrice * .05)}
                </td>
              </tr>

              <tr>
                <td>Occupancy taxes

                <div className='help-tip'>
                  <p>Accommodations Tax ({this.props.city})
                  <br></br>
                  <a href='#'>Learn More</a>
                  </p>
                </div>

                </td>
                <td>${Math.round(occupancyTaxPercentage * totalNightsPrice)}
                </td>
              </tr>

              <tr>
                <td>Total</td>
                <td>${Math.round(totalNightsPrice + this.props.cleaningFee + totalNightsPrice * .05 + occupancyTaxPercentage * totalNightsPrice)}
                </td>
              </tr>

            </tbody>
          </table>

        </div>
      );
    }
  }
}

export default PricingTotal;