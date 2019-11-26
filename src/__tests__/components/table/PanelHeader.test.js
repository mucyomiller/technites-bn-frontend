/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16/build";
import PanelHeader from "../../../components/table/PanelHeader";
import SearchBox from "../../../components/search-box/SearchBox";

Enzyme.configure({ adapter: new Adapter() });

const getRequests = jest.fn();
const setPageNumbers = jest.fn();
const handleSelect = jest.fn();
const handleSearch = jest.fn();
const props = {
  pageTitle: "test",
  setPageNumbers,
  getRequests,
  handleSelect,
  handleSearch,
  searchQuery: "status",
};
describe("Panel Header Test", () => {
  const component = shallow(
    <PanelHeader {...props} />,
  );
  it("should trigger getRequests button", () => {
    const button = component.find(".transparent-button").at(1);
    button.simulate("click");
    expect(getRequests).toHaveBeenCalled();
  });
  it("should trigger openRequests button", () => {
    const button = component.find(".transparent-button").at(2);
    button.simulate("click");
    expect(getRequests).toHaveBeenCalled();
  });
  it("should trigger pastRequests button", () => {
    const button = component.find(".transparent-button").at(3);
    button.simulate("click");
    expect(getRequests).toHaveBeenCalled();
  });
  it("should trigger handleChange", () => {
    const txtbox = component.find(".panel-page-number");
    const event = { target: { value: "1" } };
    txtbox.simulate("change", event);
    expect(setPageNumbers).toHaveBeenCalled();
  });
});
