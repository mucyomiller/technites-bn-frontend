import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { act } from "@testing-library/react";
import Feedback from "../../../components/feedback/Feedback";

const mockedStore = configureStore([thunk]);
let wrapper;
describe("feeedback components tests", () => {
  beforeEach(() => {
    const store = mockedStore({
      feedback: {
        feedbacks: [
          {
            "id": 56,
            "user_id": 5,
            "feedback": "<p>some texts with emoji's 😂</p>",
            "createdAt": "2019-11-19T09:45:28.767Z",
            "User": {
              "id": 5,
              "firstname": "Requester",
              "lastname": "user",
              "image_url": "https://res.cloudinary.com/mucyomiller/image/upload/v1563505816/tgfejta0utuc8u9ekzhb.png"
            }
          },
          {
            "id": 57,
            "user_id": 6,
            "feedback": "<p>some other text with emoji's 👌</p>",
            "createdAt": "2019-11-19T09:45:28.767Z",
            "User": {
              "id": 5,
              "firstname": "Requester2",
              "lastname": "user2"
            }
          }
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <Feedback accommodationId={2} />
      </Provider>,
    );
  });

  it("it have to render FeedbackItem components", () => {
    expect(wrapper.find('FeedbackItem')).toHaveLength(2);
  });
  it("it have to render FeedbackEditor components", () => {
    expect(wrapper.find('FeedbackEditor')).toHaveLength(1);
  });

  it("simulate save feedback", () => {
    act(() => {
      wrapper.find('FeedbackEditor').props().saveFeedback();
      wrapper.find('.save-feedback').props().onClick();
    })
  });


  it("render with empty feedbacks to simulate loading", () => {
    const store = mockedStore({
      feedback: {}
    });

    wrapper = mount(
      <Provider store={store}>
        <Feedback accommodationId={2} />
      </Provider>,
    );
  });
});
