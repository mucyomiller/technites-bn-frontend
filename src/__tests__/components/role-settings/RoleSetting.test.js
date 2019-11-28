import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import RoleSettings from "../../../components/role-settings/RoleSettings";
import { token, messages } from "../../../__mocks__/fixtures";

const mockedStore = configureStore([thunk]);
const storeObj = {
  messages,
  role: {
    users: [{
      id: 4,
      firstname: "Travel",
      lastname: "Admin",
      email: "travel@admin.com",
      username: "TravelAdmin",
      is_verified: true,
      role_value: 4,
      line_manager: "technitesdev@gmail.com",
      isEmailAllowed: "true",
      auto_fill: null,
      createdAt: "2019-10-11T10:50:28.214Z",
      updatedAt: "2019-10-11T10:50:28.214Z",
    }],
    error: {
      message: "error happened",
    },
    status: "role_add_success",
  },
  notifications: {
    notifications: [],
  },
  loginState: {
    isAuthenticated: true,
  },
  profile: {
    user: {
      firstname: "some firstname",
      lastname: "some lastname",
      image_url: null,
    },
  },
};
let wrapper;
describe("rolesetting components tests", () => {
  beforeAll(() => {
    Storage.prototype.getItem = jest.fn(() => token);
    const store = mockedStore(storeObj);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
  });
  it("it have to render RoleSettings component", () => {
    expect(wrapper.find("RoleSettings")).toHaveLength(1);
  });
  it("it show nofitication of type error", () => {
    const store = mockedStore({
      messages,
      role: {
        users: [{
          id: 4,
          firstname: "Travel",
          lastname: "Admin",
          email: "travel@admin.com",
          username: "TravelAdmin",
          is_verified: true,
          role_value: 4,
          line_manager: "technitesdev@gmail.com",
          isEmailAllowed: "true",
          auto_fill: null,
          createdAt: "2019-10-11T10:50:28.214Z",
          updatedAt: "2019-10-11T10:50:28.214Z",
        }],
        error: {
          message: "error happened",
        },
        status: "role_add_fail",
      },
      notifications: {
        notifications: [],
      },
      loginState: {
        isAuthenticated: true,
      },
      profile: {
        user: {
          firstname: "some firstname",
          lastname: "some lastname",
          image_url: null,
        },
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
  });
  it("it show nofitication of type error", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: storeObj.role.users,
        error: {
          error: [{
            msg: "some error happened!"
          }],
        },
        status: "role_add_fail",
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
  });

  it("it show nofitication of type error", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: storeObj.role.users,
        error: {
          error: "some error happened!",
        },
        status: "role_add_fail",
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
  });
  it("it show nofitication of type error", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: storeObj.role.users,
        error: {
          errors: {
            message: "some error happened!",
          },
        },
        status: "role_add_fail",
      },
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
  });
  it("test error with empty status", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: storeObj.role.users,
        error: {
          errors: {
            message: "some error happened!",
          },
        },
        status: "something",
      },
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
  });
  it("it show nofitication of type error", () => {
    const store = mockedStore({
      messages,
      role: {
        users: [{
          id: 4,
          firstname: "Travel",
          lastname: "Admin",
          email: "travel@admin.com",
          username: "TravelAdmin",
          is_verified: true,
          role_value: 4,
          line_manager: "technitesdev@gmail.com",
          isEmailAllowed: "true",
          auto_fill: null,
          createdAt: "2019-10-11T10:50:28.214Z",
          updatedAt: "2019-10-11T10:50:28.214Z",
        }],
        error: {
          message: "error happened",
        },
        status: "retrieve_fail",
      },
      notifications: {
        notifications: [],
      },
      loginState: {
        isAuthenticated: true,
      },
      profile: {
        user: {
          firstname: "some firstname",
          lastname: "some lastname",
          image_url: null,
        },
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
  });

  it("simulate assign role button clicked", () => {
    const store = mockedStore({
      ...storeObj,
      error: {
        message: "error happened",
      },
      status: "retrieve_fail",
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("#assignBtn").props().onClick();
  });
  it("simulate assign role button clicked", () => {
    const store = mockedStore({
      ...storeObj,
      error: {
        message: "error happened",
      },
      status: "retrieve_fail",
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("select").props().onChange({ target: { value: "travel@admin.com" } });
  });
  it("Test User With Super Admin role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 7,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("select").props().onChange({ target: { value: "travel@admin.com" } });
  });
  it("Test  User with Travel Admin & Manager role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 6,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("select").props().onChange({ target: { value: "travel@admin.com" } });
  });
  it("Test  User with Travel Admin & Requester role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 5,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("select").props().onChange({ target: { value: "travel@admin.com" } });
  });

  it("Test  User with Manager & Requester role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 3,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("select").props().onChange({ target: { value: "travel@admin.com" } });
  });

  it("Test  User with Manager role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 2,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("select").props().onChange({ target: { value: "travel@admin.com" } });
  });
  it("Test  User with Requester role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 1,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("select").props().onChange({ target: { value: "travel@admin.com" } });
  });
  it("Test  User with invalid role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 100,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("select").props().onChange({ target: { value: "travel@admin.com" } });
  });

  it("Test  Assigning User a  Manager role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 1,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("#manager").props().onChange({ target: { checked: true } });
    wrapper.find("#assignBtn").props().onClick();
  });
  it("Test  Assigning User a  Requester role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 2,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("#requester").props().onChange({ target: { checked: true } });
    wrapper.find("#assignBtn").props().onClick();
  });
  it("Test  Assigning User a  Requester role", () => {
    const store = mockedStore({
      ...storeObj,
      role: {
        users: [
          {
            id: 7,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            role_value: 2,
            auto_fill: null,
          },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RoleSettings />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find("#travel_admin").props().onChange({ target: { checked: true } });
    wrapper.find("#assignBtn").props().onClick();
  });
});
