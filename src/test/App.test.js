import React from 'react';
import { shallow, mount } from '../enzyme';
import App from '../App';



describe("should rendered Main", () => {
  it("should render my Main", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});

