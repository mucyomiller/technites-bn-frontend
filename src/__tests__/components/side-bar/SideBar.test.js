/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16/build";
import SideBar from "../../../components/side-bar";

Enzyme.configure({ adapter: new Adapter() });

const props = {
  userRole: 1,
};
describe("SideBar Test", () => {
  const component = shallow(
    <SideBar {...props} />,
  );
  it("should render without crashing", () => {
    expect(component).toHaveLength(1);
  });
});
