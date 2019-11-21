/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16/build";
import Table from "../../../components/table";

Enzyme.configure({ adapter: new Adapter() });

const paginate = jest.fn();
const props = {
  columns: [],
  elements: [],
  postsPerPage: "4",
  totalPosts: 10,
  paginate,
  currentPageNumber: 1,
};
describe("Table Test", () => {
  const component = shallow(
    <Table {...props} />,
  );
  it("should trigger getRequests button", () => {
    const button = component.find(".pagination-box").at(1);
    button.simulate("click");
    expect(paginate).toHaveBeenCalled();
  });
});
