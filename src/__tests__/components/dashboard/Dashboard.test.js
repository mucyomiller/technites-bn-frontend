import React from "react";
import { shallow } from "enzyme";
import Dashboard from "../../../components/dashboard/Dashboard";

describe("Dashboard", () => {
  const dashboard = shallow(<Dashboard />);
  test("should render the dummy dashboard", () => {
    expect(dashboard.find("h2").text()).toEqual("Dummy Dashboard");
  });
});
