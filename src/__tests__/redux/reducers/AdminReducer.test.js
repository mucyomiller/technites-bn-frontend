import AdminReducer from "../../../redux/reducers/AdminReducer";
import * as types from "../../../redux/actions/actionType";

describe("AdminReducer unit tests", () => {
  it("should reduce Admin requests", () => {
    const state = AdminReducer(
      { hostAdded: false },
      {
        type: "ADD_HOST",
        payload: [
          {
            status: 201,
            message: "Host Added succesfully!",
          },
        ],
      },
    );
    expect(state).toEqual({
      hostAdded: true,
    });
  });
});
