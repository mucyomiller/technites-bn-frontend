import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "../../../components/side-bar";
import { render, fireEvent, cleanup } from "@testing-library/react";

describe("SideBar Testing", () => {
  afterEach(cleanup);
  it("should click on the side menu hamburger menu", () => {
    const { container } = render(<SideBar userRole={7} />);
    const hamburger = container.querySelector(".side-bar-hamburger");
    fireEvent.click(hamburger);
    expect(hamburger).toBeDefined();
  });
  it("should click on one menu item and close the sidebar", () => {
    const { container } = render(<SideBar userRole={2} />);
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector(".nav-item");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar for host", () => {
    const { container } = render(
      <Router>
        <SideBar userRole={0} />
      </Router>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector(".nav-item");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar for host || New Room", () => {
    const { container } = render(
      <Router>
        <SideBar userRole={0} />
      </Router>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#new-room");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar for requester", () => {
    const { container } = render(<SideBar userRole={1} />);
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector(".nav-item");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || new request", () => {
    const { container } = render(<SideBar userRole={1} />);
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#new-request");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || all request", () => {
    const { container } = render(<SideBar userRole={7} />);
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#all-request");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || Add host", () => {
    const { container } = render(<SideBar userRole={7} />);
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#add-host");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || roles", () => {
    const { container } = render(<SideBar userRole={7} />);
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#change-roles");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || View all accommodations", () => {
    const { container } = render(<SideBar userRole={7} />);
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#view-accommodation");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
});
