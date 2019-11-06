import reducers from "../../../redux/reducers/rootReducer";
import successResponse from "../../../__mocks__/__profile_data_success__.json";
import errorresponse from "../../../__mocks__/__profile_response_error__.json";
import errorupdate from "../../../__mocks__/__profile_update_error__.json";

describe("profile reducers", () => {
  test("RETRIEVE_PROFILE", () => {
    const state = reducers({ profile: { user: {} } }, {
      type: "RETRIEVE_PROFILE",
      payload: successResponse,
    });
    expect(state.profile).toEqual({ user: successResponse, status: "retrieve_success" });
  });
  test("RETRIEVE_FAIL", () => {
    const state = reducers({ profile: { error: {} } }, {
      type: "RETRIEVE_FAIL",
      payload: errorresponse,
    });
    expect(state.profile).toEqual({ error: errorresponse, status: "retrieve_fail" });
  });
  test("UPDATE_PROFILE", () => {
    const state = reducers({ profile: { user: {} } }, {
      type: "UPDATE_PROFILE",
      payload: successResponse,
    });
    expect(state.profile).toEqual({ user: successResponse, status: "update_success" });
  });

  test("UPDATE_FAIL", () => {
    const state = reducers({ profile: { error: {} } }, {
      type: "UPDATE_FAIL",
      payload: errorupdate,
    });
    expect(state.profile).toEqual({ error: errorupdate, status: "update_fail" });
  });
});
