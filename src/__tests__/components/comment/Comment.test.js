import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { act } from "@testing-library/react";
import Comment from "../../../components/comment/Comment";

const mockedStore = configureStore([thunk]);
let wrapper;
describe("comment components tests", () => {
  beforeEach(() => {
    const store = mockedStore({
      comment: {
        comments: [
          {
            "id": 56,
            "request_id": 2,
            "user_id": 5,
            "comment": "<p>some texts with emoji's 😂</p>",
            "active": true,
            "createdAt": "2019-11-19T09:45:28.767Z",
            "updatedAt": "2019-11-19T09:45:28.767Z",
            "User": {
              "id": 5,
              "firstname": "Requester",
              "lastname": "user",
              "image_url": "https://res.cloudinary.com/mucyomiller/image/upload/v1563505816/tgfejta0utuc8u9ekzhb.png"
            }
          },
          {
            "id": 57,
            "request_id": 2,
            "user_id": 6,
            "comment": "<p>some other text with emoji's 👌</p>",
            "active": true,
            "createdAt": "2019-11-19T09:45:28.767Z",
            "updatedAt": "2019-11-19T09:45:28.767Z",
            "User": {
              "id": 5,
              "firstname": "Requester2",
              "lastname": "user2"
            }
          }
        ],
      },
    });

    const owner = {
      id: 5,
      firstname: "first",
      lastname: "first2",
      image_url: "http://res.cloudinary.com/technites/image/upload/v1573805027/q1pbnyjibyo5t2qwit6b.png"
    }

    wrapper = mount(
      <Provider store={store}>
        <Comment requestId={2} owner={owner} />
      </Provider>,
    );
  });

  it("it have to render commentItem components", () => {
    expect(wrapper.find('CommentItem')).toHaveLength(2);
  });
  it("it have to render commentEdior components", () => {
    expect(wrapper.find('CommentEditor')).toHaveLength(1);
  });
  it("simulate remove comment", () => {
    wrapper.find('CommentItem').first().props().removeComment();
  });

  it("simulate save comment", () => {
    act(() => {
      wrapper.find('CommentEditor').props().saveComment();
      wrapper.find('.save-comment').props().onClick();
    })
  });

  it("render with empty comments to simulate loading", () => {
    const store = mockedStore({
      comment: {}
    })

    const owner = {
      id: 5,
      firstname: "first",
      lastname: "first2",
      image_url: "http://res.cloudinary.com/technites/image/upload/v1573805027/q1pbnyjibyo5t2qwit6b.png"
    }
    wrapper = mount(
      <Provider store={store}>
        <Comment requestId={2} owner={owner} />
      </Provider>,
    );
  });
});
