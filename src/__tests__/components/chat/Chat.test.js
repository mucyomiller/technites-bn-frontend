/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Adapter from "enzyme-adapter-react-16/build";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { JSDOM } from "jsdom";
import Chat, { Chat as ChatComponent } from "../../../components/chat";
import { propsTemplate, messages } from "../../../__mocks__/fixtures";

Enzyme.configure({ adapter: new Adapter() });
const mockedStore = configureStore([thunk]);

const store = mockedStore(propsTemplate);

describe("Chat component", () => {
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <ChatComponent {...propsTemplate} history={{ push: jest.fn() }} />
      </Router>
      ,
    </Provider>
  );
  const component = mount(
        <ChatComponent {...propsTemplate} store={store} history={{ push: jest.fn() }} />
  );
  const component2 = shallow(
    <ChatComponent {...propsTemplate} history={{ push: jest.fn() }} />
  );
  it("should render without crashing to cover mapStateToProps", () => {
    const nextPropsSuccess = { ...propsTemplate };
    wrapper.setProps(nextPropsSuccess);
    expect(wrapper).toHaveLength(1);
  });
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  })
  it("should set the props", () => {
    const nextPropsError = {
      errors: {
        errors: [{ message: "error message" }, { message: "error message" }]
      },
      user: {
        role_value: 7
      },
      messages: {}
    };
    component2.setProps(nextPropsError);
    expect(component2.state()).toHaveProperty("user", { role_value: 7 });
  });
  it("should set the showState to true", () => {
    component.setState({ showState: true });
    expect(component.state()).toHaveProperty("showState", true);
  });
    it("should set the loading state to true", () => {
      component.setState({ loading: true });
      expect(component.state()).toHaveProperty("loading", true);
    });
    it("should set the loading state to false", () => {
        component.setState({ loading: false });
        expect(component.state()).toHaveProperty("loading", false);
      });
    it("should set the newMessage state to false", () => {
      component.setState({ newMessage: false });
      expect(component.state()).toHaveProperty("newMessage", false);
    });
    it("should set the newMessage state to true", () => {
        component.setState({ newMessage: true });
        expect(component.state()).toHaveProperty("newMessage", true);
      });
    it("should trigger close button", () => {
        
      const closebtn = component.find(".close-icon").at(1);
      closebtn.props().onClick();
      expect(component.state()).toHaveProperty("showState", false);
    });
    it("should trigger send message button", () => {
      component.setState({ loading: false, showState: true });
      const chatBtn = component.find(".chat-btn").at(1);
      chatBtn.props().onClick();
      expect(component.state()).toHaveProperty("myMessage", "");
    });
  it("should trigger new-message-alert button", () => {
      const newMessageBtn = component.find(".new-message-alert");
      newMessageBtn.props().onClick();
      expect(component.state()).toHaveProperty("newMessage", false);
  });
  it("should trigger send message on textbox Key up", () => {
    component.setState({ loading: false, showState: true });
    const txtbox = component.find(".chat-txtbox");
    console.log(txtbox.props())
    txtbox.props().onKeyUp({target: { name: "message", value: "" }, which: 13});
    expect(component.state()).toHaveProperty("myMessage", "");
  });
  it("should trigger send message on textbox Key up when key is not enter 'which'", () => {
    component.setState({ loading: false, showState: true });
    const txtbox = component.find(".chat-txtbox");
    console.log(txtbox.props())
    txtbox.props().onKeyUp({target: { name: "message", value: "" }, which: 10});
    expect(component.state()).toHaveProperty("myMessage", "");
  });
  it("should set the showState to false", () => {
    component.setState({ showState: false });
    expect(component.state()).toHaveProperty("showState", false);
  });
});
