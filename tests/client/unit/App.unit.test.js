import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import App from '../../../client/src/components/App.jsx';
import bookingsSample from '../../../database/dummy_data.js';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('should render correctly', () => {
    const output = shallow(
      <App listing={bookingsSample}></App>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
