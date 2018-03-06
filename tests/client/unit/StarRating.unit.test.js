import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import StarRating from '../../../client/src/components/StarRating.jsx';
import bookingsSample from '../../../database/dummy_data.js';

configure({ adapter: new Adapter() });

describe('StarRating', () => {
  it('should render correctly', () => {
    const output = shallow(
      <StarRating rating={bookingsSample.star_rating}></StarRating>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});