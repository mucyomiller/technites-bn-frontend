/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import http from "../../../services/httpServices";
import {
  RETRIEVE_COMMENT,
  RETRIEVE_COMMENT_FAIL,
  SUBMIT_COMMENT,
  SUBMIT_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL
} from "../../../redux/actions/actionType";
import { retrieveComment, deleteComment, submitComment } from "../../../redux/actions/commentAction";
import { token } from "../../../__mocks__/fixtures";

const mockedStore = configureStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
let store;

describe("Comment actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
    Storage.prototype.getItem = jest.fn(() => token);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should retrieve comment", async () => {
    const successResponse = {
      "status": 200,
      "response": {
        "data": {
          "comments": []
        }
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successResponse);
      await flushPromises();
    });
    await store.dispatch(retrieveComment(2));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_COMMENT);
  });
  it("should return error on comment retrieval fail", async () => {
    const errorreponse = {
      "status": 404,
      "response": {
        "data": {
          "error": {}
        }
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(retrieveComment(2));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_COMMENT_FAIL);
  });
  it("should catch network error on comment retrieval", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        message: "Network Error",
      });
      await flushPromises();
    });
    await store.dispatch(retrieveComment(2));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_COMMENT_FAIL);
  });

  it("should submit a comment", async () => {
    const successResponse = {
      "status": 200,
      "response": {
        "status": 200,
        "message": "comment posted",
        "data": {
          "id": 58,
          "request_id": 2,
          "user_id": 5,
          "comment": "some comment5",
          "updatedAt": "2019-11-19T12:06:17.036Z",
          "createdAt": "2019-11-19T12:06:17.036Z",
          "active": "true"
        }
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successResponse);
      await flushPromises();
    });
    const data = {
      "comment": "some comment here",
    }
    await store.dispatch(submitComment(2, data));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SUBMIT_COMMENT);
  });
  it("it should fail when submitted wrong data provided", async () => {
    const errorresponse = {
      "status": 422,
      "error": {
        "response": {
          "status": 422,
          "error": [
            {
              "msg": "comment can not be empty",
              "param": "comment",
              "location": "body"
            },
            {
              "msg": "comment field required",
              "param": "comment",
              "location": "body"
            }
          ]
        }
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorresponse);
      await flushPromises();
    });
    await store.dispatch(submitComment(2, {}));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SUBMIT_COMMENT_FAIL);
  });
  it("should catch network error on comment submission", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        message: "Network Error",
      });
      await flushPromises();
    });
    await store.dispatch(submitComment(2, {}));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SUBMIT_COMMENT_FAIL);
  });

  it("it should delete comment", async () => {
    const successResponse = {
      "status": 200,
      "response": {
        "status": 200,
        "message": "comment deleted"
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successResponse);
      await flushPromises();
    });
    await store.dispatch(deleteComment(2, 2));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(DELETE_COMMENT_SUCCESS);
  });

  it("it should fail to delete comment", async () => {
    const successResponse = {
      "status": 400,
      "error": {
        "status": 400,
        "error": "Invalid token"
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successResponse);
      await flushPromises();
    });
    await store.dispatch(deleteComment(2, 2));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(DELETE_COMMENT_FAIL);
  });
  it("should catch network error on comment deletion", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent(); 
      request.reject({
        status: 400,
        message: "Network Error",
      });
      await flushPromises();
    });
    await store.dispatch(deleteComment(2, 2));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(DELETE_COMMENT_FAIL);
  });
});
