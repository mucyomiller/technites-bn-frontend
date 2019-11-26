import ErrorReducer from "../../../redux/reducers/ErrorReducer";

describe("Error reducer unit tests", () => {
  it("should reduce an error when thrown", () => {
    const state = ErrorReducer(
      {},
      { type: "GET_ERRORS", payload: { } },
    );
    expect(state).toEqual({ });
  });
});
