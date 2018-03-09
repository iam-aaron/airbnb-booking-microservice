import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PricingTotal from '../../../client/src/components/PricingTotal.jsx';
import bookingsSample from '../../../database/dummy_data.js';

configure({ adapter: new Adapter() });

describe('PricingTotal', () => {
  it('should render correctly', () => {
    const output = shallow(
      <PricingTotal listing={bookingsSample}></PricingTotal>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
