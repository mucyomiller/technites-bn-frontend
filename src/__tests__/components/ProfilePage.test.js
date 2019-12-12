/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import sinon from "sinon";
import React from "react";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import ProfileComponent, {
  ProfilePage,
} from "../../components/profile-page/ProfilePage";
import Select from "../../components/profile-page/Select";
import user from "../../__mocks__/__profile_data_success__.json";
import { messages } from "../../__mocks__/fixtures";

const mockedStore = configureStore([thunk]);

let wrapper;

describe("profile unit tests", () => {
  beforeEach(() => {
    wrapper = shallow(
      <ProfilePage
        fetchProfileInfo={jest.fn()}
        user={user}
        updateprofileInfo={jest.fn()}
      />,
    );
  });

  it("render profile component w/o crash", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("trigger profile error", () => {
    const props = { error: { error: "Oops! something expected happened!" } };
    wrapper.setProps(props);
    expect(wrapper.instance().props).toHaveProperty("error", props.error);
  });
  it("pass users props to profile component", () => {
    const props = { user };
    wrapper.setProps(props);
    expect(wrapper.instance().props).toHaveProperty("user", props.user);
  });
  it("simulate click on edit to toggle editmode", () => {
    wrapper.find("#btn_edit_toggle").simulate("click");
    expect(wrapper.instance().state.isEditMode).toBe(true);
  });

  it("simulate on select image", () => {
    const state = { isEditMode: true };
    wrapper.setState(state);
    const file = new File(["(⌐□_□)"], "wizardhere.png", { type: "image/png" });
    wrapper.find("#profileselector").simulate("change", {
      preventDefault: jest.fn(),
      target: { files: [file] },
    });
    expect(wrapper.instance().state.file).toBe("");
    expect(wrapper.instance().state.imagePreviewUrl).toBe("");
  });

  it("mount profile  component with default avatar profile image", () => {
    const noimage_url = {};
    const state = { isEditMode: true };
    wrapper.setState(state);
    expect(wrapper.find("img[alt=\"preview\"]")).toHaveLength(1);
  });

  it("simulate update action with image upload", () => {
    const file = new File(["(⌐□_□)"], "wizardhere.png", { type: "image/png" });
    const state = { isEditMode: true, file };
    wrapper.setState(state);
    wrapper.find("#btn_update").simulate("click");
    expect(wrapper.instance().state.file).toBe(file);
  });
  it("simulate update action", () => {
    const state = { isEditMode: true, firstname: "user" };
    wrapper.setState(state);
    wrapper.find("#btn_update").simulate("click");
    expect(wrapper.instance().state.firstname).toBe("user");
  });

  it("simulate profile  component with image preview available", () => {
    const imagePreviewUrl = "some image path here";
    const state = { isEditMode: true, imagePreviewUrl };
    wrapper.setState(state);
    wrapper.find("#btn_update").simulate("click");
    expect(wrapper.instance().state.imagePreviewUrl).toBe(imagePreviewUrl);
  });
  it("rofile  component with status retrieve_success", (done) => {
    wrapper.setProps({ status: "retrieve_success" });
    expect(wrapper.instance().props.status).toBe("retrieve_success");
    wrapper.setProps({ status: "update_success" });
    expect(wrapper.instance().props.status).toBe("update_success");
    done();
  });
  it("simulate profile  component with errors object", (done) => {
    const props = { status: "retrieve_fail", error: { errors: "some error" } };
    wrapper.setProps(props);
    expect(wrapper.instance().props.status).toBe(props.status);
    wrapper.setProps({ error: { errors: ["other errors"] } });
    expect(wrapper.instance().props.error.errors[0]).toBe("other errors");
    wrapper.setProps({
      status: "update_fail",
      error: { error: "simple error" },
    });
    expect(wrapper.instance().props.error.error).toBe("simple error");
    expect(wrapper.instance().props.status).toBe("update_fail");
    wrapper.setProps({ status: "unknown" });
    expect(wrapper.instance().props.status).toBe("unknown");
    done();
  });
});

describe("profile integration tests", () => {
  beforeEach(() => {
    const store = mockedStore({
      messages,
      profile: {
        status: {
          message: "updated profile successful!",
        },
        user: {
          id: 5,
          firstname: "firstname",
          lastname: "user",
          email: "requester@request.com",
          username: "requesting",
          is_verified: true,
          role_value: 1,
          phone: "07822222222",
          gender: "Male",
          dob: "2019-11-13T10:33:27.677Z",
          address: "Kigali",
          country: "Rwanda",
          language: "English",
          currency: "USD",
          image_url:
            "https://avatars0.githubusercontent.com/u/11447549?s=460&v=4",
          company: "Andela",
          department: "Engineering",
          line_manager: "manager@admin.com",
          isEmailAllowed: "true",
          createdAt: "2019-10-11T10:50:28.214Z",
          updatedAt: "2019-11-12T09:49:06.152Z",
        },
        error: {
          errors: ["some errors"],
        },
      },
      notifications: {
        notifications: [
          {
            createdAt: "2019-11-13T10:07:21.401Z",
            id: 8,
            message: "visit nairobi",
            request_id: 12,
            seen: "false",
            type: "ReturnTrip",
            updatedAt: "2019-11-15T13:13:44.347Z",
            user_id: 49,
            notPaneDisplay: false,
          },
        ],
        markThisRead: jest.fn(),
        toggleNotDisplay: jest.fn(),
        notPaneDisplay: false,
        notificationCount: 1,
      },
      loginState: {
        isAuthenticated: true,
      },
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileComponent
            user={user}
            fetchProfileInfo={jest.fn()}
            updateprofileInfo={jest.fn()}
          />
        </MemoryRouter>
      </Provider>,
    );
  });

  it("simulate handleInputChange", () => {
    wrapper.find("#btn_edit_toggle").simulate("click");
    wrapper.find("#firstname").simulate("change", {
      target: { name: "firstname", value: "miller" },
    });
    expect(wrapper.find("Input[name=\"firstname\"]").props().value).toBe(
      "miller",
    );
  });

  it("mount profile  component with default props", (done) => {
    wrapper.setProps({ status: { message: "test" } });
    expect(wrapper).toHaveLength(1);
    expect(wrapper.props().status).toHaveProperty("message");
    done();
  });
  it("simulate handleInputChange for checkboxes", (done) => {
    wrapper.find("#btn_edit_toggle").simulate("click");
    wrapper.find("#firstname").simulate("change", {
      target: { name: "firstname", type: "checkbox", checked: true },
    });
    done();
  });
  it("mount select with errors", () => {
    const props = {
      mode: true,
      label: "Gender",
      name: "gender",
      value: "Male",
      options: ["Male", "Female"],
      handler: jest.fn(),
      error: "some weird error happened",
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    wrapper = mount(<Select {...props} />);
    expect(wrapper.props().error).toBe("some weird error happened");
  });
});

sinon.stub(window.location, "assign");
jest.spyOn(window.location, "assign").mockImplementation((l) => {
  expect(l).toEqual();
});
