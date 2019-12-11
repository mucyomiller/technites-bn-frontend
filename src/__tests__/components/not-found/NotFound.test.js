import React from "react";
import { shallow, mount } from "enzyme";
import NotFound from "../../../components/not-found/NotFound";
import { propsTemplate } from "../../../__mocks__/fixtures";
describe("NotFound", () => {
  const component = mount(<NotFound {...propsTemplate} />);
  test("should render the not found page", () => {
    expect(component).toHaveLength(1);
  });
  test("should click on button to return to home",() => {
    component.find(".return-home").simulate("click");
    expect(component).toHaveLength(1);
  });
});
