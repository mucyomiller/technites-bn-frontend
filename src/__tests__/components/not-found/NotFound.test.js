import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../../components/not-found/NotFound";

describe("NotFound", () => {
  const notFound = shallow(<NotFound />);
  test("should render the not found page", () => {
    expect(notFound.find("div").text()).toEqual("404 page not found");
  });
});
