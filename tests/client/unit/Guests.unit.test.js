import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Guests from '../../../client/src/components/Guests.jsx';
import bookingsSample from '../../../database/dummy_data.js';

configure({ adapter: new Adapter() });


describe('Guests', () => {
  it('should render fully and correctly', () => {
    const output = shallow(
      <Guests listing={bookingsSample}></Guests>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});