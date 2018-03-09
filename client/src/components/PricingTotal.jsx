import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

class PricingTotal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPricing: false,
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
    this.setState({
      startDate: nextProps.startDate,
      endDate: nextProps.endDate,
      adults: nextProps.adults,
      children: nextProps.children,
      infants: nextProps.infants,
      price: nextProps.price,
      weekendPrice: nextProps.weekendPrice
    });
    if (nextProps.showPricing) {
      this.calculateTotals(nextProps.startDate, nextProps.endDate);
      this.setState({
        showPricing: true
      });
    }
  }

  onChange(array) {

  }

  calculateTotals(startDate, endDate) {
    if (endDate < startDate) {
      let temp = endDate;
      endDate = startDate;
      startDate = temp;
    }
    let countWeekendDays = function countWeekendDays(startDay, totalNights) {
      return _.range(startDay.getDay(), startDay.getDay() + totalNights)
        .map((x) => x % 7)
        .filter((x) => (x === 6 || x === 5))
        .length;
    };

    const millisecondsInDay = 86400000;
    let totalNights = Math.round((endDate - startDate) / millisecondsInDay);
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
    let percent = 0.075; //hard-coded
    this.setState({
      occupancyTaxPercentage: percent
    });
  }

  render() {
    let totalNightsPrice; let totalNights; let occupancyTaxPercentage; let startDate; let showPricing;
    ({totalNights, totalNightsPrice, occupancyTaxPercentage, startDate, showPricing} = this.state);
    let nightlyPrice = Math.round((totalNightsPrice / totalNights) * 100) / 100;


    if (!showPricing) {
      return null;
    } else {
      return (
        <div className='pricing-container'>
          <table className='pricing-table'>
            <tbody className='table-body'>

              <tr className='bottom-separator'>
                <td>$ {Math.round(nightlyPrice)} ⨯ {totalNights} Night{totalNights > 1 ? 's' : null}
                </td>
                <td className='price-row'>${Math.round(totalNightsPrice)}
                </td>
              </tr>

              <tr className='bottom-separator'>
                <td>Long stay discount
                </td>
                <td className='price-row'>${Math.round(totalNights > 4 ? (this.props.weeklyPriceFactor - 1) * totalNightsPrice : 0)}</td>
              </tr>

              <tr className='bottom-separator'>
                <td>Cleaning fee

                <div className='help-tip-container'>
                  <div className='help-tip'>
                    <p>One time fee charged by host to cover the cost of cleaning their space.
                    </p>
                  </div>
                </div>


                </td>
                <td className='price-row'>${this.props.cleaningFee}
                </td>
              </tr>

              <tr className='bottom-separator'>
                <td>Service fee

                <div className='help-tip-container'>
                  <div className='help-tip'>
                    <p>This helps us run our platform and offer services like 24/7 support on your trip.
                    </p>
                  </div>
                </div>

                </td>
                <td className='price-row'>${Math.round(totalNightsPrice * .05)}
                </td>
              </tr>

              <tr className='bottom-separator'>
                <td>Occupancy taxes

                <div className='help-tip-container'>
                  <div className='help-tip'>
                    <p>Accommodations Tax ({this.props.city})  
                    <a href='#'> Learn More.</a>
                    </p>
                  </div>
                </div>

                </td>
                <td className='price-row'>${Math.round(occupancyTaxPercentage * totalNightsPrice)} 
                </td>
              </tr>

              <tr className='pricing-total'>
                <td >Total</td>
                <td className='price-row'>${Math.round(totalNightsPrice + this.props.cleaningFee + totalNightsPrice * .05 + occupancyTaxPercentage * totalNightsPrice)}
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