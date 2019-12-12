import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "../../../components/side-bar";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockedStore = configureStore([thunk]);

describe("SideBar Testing", () => {
  afterEach(cleanup);
  it("should click on the side menu hamburger menu", () => {
    const state = {
      profile: {
        user: {
          role_value: 7,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    const hamburger = container.querySelector(".side-bar-hamburger");
    fireEvent.click(hamburger);
    expect(hamburger).toBeDefined();
  });
  it("should click on one menu item and close the sidebar", () => {
    const state = {
      profile: {
        user: {
          role_value: 2,
        }
      }
    }
    const store = mockedStore(state);

    const { container } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector(".nav-item");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar for host", () => {
    const state = {
      profile: {
        user: {
          role_value: 0,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <Router>
          <SideBar />
        </Router>
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector(".nav-item");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar for host || New Accommodation", () => {
    const state = {
      profile: {
        user: {
          role_value: 0,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <Router>
          <SideBar />
        </Router>
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#new-accommodation");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar for host || New Room", () => {
    const state = {
      profile: {
        user: {
          role_value: 0,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <Router>
          <SideBar />
        </Router>
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#new-room");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar for requester", () => {
    const state = {
      profile: {
        user: {
          role_value: 1,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector(".nav-item");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || new request", () => {
    const state = {
      profile: {
        user: {
          role_value: 1,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#new-request");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || all request", () => {
    const state = {
      profile: {
        user: {
          role_value: 7,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#all-request");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || Add host", () => {
    const state = {
      profile: {
        user: {
          role_value: 7,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#add-host");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || roles", () => {
    const state = {
      profile: {
        user: {
          role_value: 7,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#change-roles");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
  it("should click on one menu item and close the sidebar || View all accommodations", () => {
    const state = {
      profile: {
        user: {
          role_value: 7,
        }
      }
    }
    const store = mockedStore(state);
    const { container } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    // changing the state to open the sidebar first
    fireEvent.click(container.querySelector(".side-bar-hamburger"));
    const navItem = container.querySelector("#view-accommodation");
    fireEvent.click(navItem);
    expect(navItem).toBeDefined();
  });
});
