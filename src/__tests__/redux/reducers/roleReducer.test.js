import reducers from "../../../redux/reducers/rootReducer";

describe("role reducers", () => {
  test("RETRIEVE_USERS_SUCCESS", () => {
    const retrieveResponse = [
      {
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
      },
    ];
    const state = reducers({ role: { users: [], status: "" } }, {
      type: "RETRIEVE_USERS_SUCCESS",
      payload: retrieveResponse,
    });
    expect(state.role).toEqual({ users: retrieveResponse, status: "retrieve_success" });
  });
  test("RETRIEVE_USERS_FAIL", () => {
    const errorResponse = {
      message: "no users found",
    };
    const state = reducers({ role: { error: {} } }, {
      type: "RETRIEVE_USERS_FAIL",
      payload: errorResponse,
    });
    expect(state.role).toEqual({ error: errorResponse, status: "retrieve_fail" });
  });
  test("ADD_ROLE_SUCCESS", () => {
    const responsesuccess = {
      message: "update success",
    };

    const state = reducers({ role: { status: {} } }, {
      type: "ADD_ROLE_SUCCESS",
      payload: responsesuccess,
    });
    expect(state.role).toEqual({ status: "role_add_success" });
  });

  test("ADD_ROLE_FAIL", () => {
    const submitFail = { error: "unknown error happened" };
    const state = reducers({ role: { error: {} } }, {
      type: "ADD_ROLE_FAIL",
      payload: submitFail,
    });
    expect(state.role).toEqual({ error: submitFail, status: "role_add_fail" });
  });
  test("CLEAR_STATE", () => {
    const state = reducers({ role: { error: {} } }, {
      type: "CLEAR_STATE",
    });
    expect(state.role).toEqual({ error: {}, status: "" });
  });
});
