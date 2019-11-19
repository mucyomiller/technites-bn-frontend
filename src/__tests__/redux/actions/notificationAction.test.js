import configureMockStore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";
import http from "../../../services/httpServices";
import {
  getNotifications,
  markAllRead,
  markOneRead,
  toggleNotPane,
} from "../../../redux/actions/notificationActions";
import {
  GET_ALL_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_SEEN,
  MARK_ONE_NOTIFICATION_SEEN,
  TOOGLE_NOTIFICATION_PANE,
} from "../../../redux/actions/actionType";

let store;
const mockedStore = configureMockStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe("Notification Actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });
  it("dispatches GET_ALL_NOTIFICATIONS, action and returns data on success", async () => {
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

    await store.dispatch(getNotifications());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ALL_NOTIFICATIONS);
  });

  it("dispatches MARK_ALL_NOTIFICATIONS_SEEN, action and returns data on success", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "All read",
          data: {},
        },
      });
      await flushPromises();
    });

    await store.dispatch(markAllRead());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(MARK_ALL_NOTIFICATIONS_SEEN);
  });

  it("dispatches MARK_ONE_NOTIFICATION_SEEN, action and returns data on success", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "All read",
          data: {},
        },
      });
      await flushPromises();
    });

    await store.dispatch(markOneRead());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(MARK_ONE_NOTIFICATION_SEEN);
  });

  it("dispatches TOOGLE_NOTIFICATION_PANE, action and returns data on success", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "All read",
          data: {},
        },
      });
      await flushPromises();
    });

    await store.dispatch(toggleNotPane());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(TOOGLE_NOTIFICATION_PANE);
  });
});
