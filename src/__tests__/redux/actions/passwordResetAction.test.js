import configureMockStore from "redux-mock-store";
import sinon from "sinon";
import moxios from "moxios";
import thunk from "redux-thunk";
import http from "../../../services/httpServices";
import { PASSWORD_RESET, PASSWORD_CHANGE } from "../../../redux/actions/actionType";
import { passWordResetAction, passWordChangeAction } from "../../../redux/actions/passwordResetAction";


let store;
const mockedStore = configureMockStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe("Password Reset Actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
  });
  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });
  it("dispached PASSWORD_RESET to send email on success", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          data: {},
        },
      });
      await flushPromises();
    });
    const data = {
      email: "user@email.com",
    };
    await store.dispatch(passWordResetAction(data));
    sinon.stub(window.location, "assign");
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(PASSWORD_RESET);
  });

  it("dispached PASSWORD_RESET to send email on success", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {},
        message: "error",
      });
      await flushPromises();
    });
    const data = {
      email: "user@email.com",
    };
    await store.dispatch(passWordResetAction(data));
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });

  it("dispached PASSWORD_RESET to send email on success", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        message: "error",
        response: {
          data: {
            errors: ["errors"]
          }
        }
      });
      await flushPromises();
    });
    const data = {
      email: "user@email.com",
    };
    await store.dispatch(passWordResetAction(data));
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });

  it("dispached PASSWORD_RESET on failure", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          data: {
            error: "error",
            
          },
        },
        message: "error",
      });
      await flushPromises();
    });
    const data = {
      email: "user@email.com",
    };
    await store.dispatch(passWordResetAction(data));
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });

  it("dispached PASSWORD_RESET on failure", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        message:"error"
      });
      await flushPromises();
    });
    const data = {
      email: "user@email.com",
    };
    await store.dispatch(passWordResetAction(data));
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });

  it("dispached PASSWORD_CHANGE to backend or return error", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          statusText: "bad request",
          data: {
            errors: [
              "error",
            ],
            error: "error",
          },
        },
        message: "error",
      });
      await flushPromises();
    });
    const data = {
      password: "123qwe@A",
      confirm_password: "123qwe@",
    };
    const token = "token";

    await store.dispatch(passWordChangeAction(data, token));
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });

  it("dispached PASSWORD_CHANGE to backend or return error", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          statusText: "error",
          data: {},
          error: {
            message: "error",
          },
          message: {
            message: "error",
          },
        },
      });
      await flushPromises();
    });
    const data = {
      password: "123qwe@A",
      confirm_password: "123qwe@A",
    };
    const token = "token";

    await store.dispatch(passWordChangeAction(data, token));
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });

  it("dispached PASSWORD_CHANGE to backend or return error", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          // error: new Error("error"),
          statusText: "Bad request",
        },
      });
      await flushPromises();
    });
    const data = {
      password: "123qwe@A",
      confirm_password: "123qwe@A",
    };
    const token = "token";

    await store.dispatch(passWordChangeAction(data, token));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(PASSWORD_CHANGE);
  });
});
jest.spyOn(window.location, "assign").mockImplementation((l) => {
  expect(l).toEqual();
});
