import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MyCalendar from '../../../client/src/components/MyCalendar.jsx';
import bookingsSample from '../../../database/dummy_data.js';

configure({ adapter: new Adapter() });

describe('MyCalendar', () => {
  it('should render correctly', () => {
    const output = shallow(
      <MyCalendar listingId={bookingsSample.star_rating}></MyCalendar>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});

describe('MyCalendar', () => {
  it('should render fully and correctly', () => {
    const output = shallow(
      <MyCalendar listing={bookingsSample}></MyCalendar>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});