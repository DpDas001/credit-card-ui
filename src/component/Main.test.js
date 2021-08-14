import React from 'react';
import { shallow, mount } from '../enzyme';
import Main from '../component/Main';



describe("should rendered Main", () => {
  it("should render my Main", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});

