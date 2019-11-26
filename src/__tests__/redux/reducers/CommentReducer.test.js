import reducers from "../../../redux/reducers/rootReducer";

describe("commment reducers", () => {
  test("RETRIEVE_COMMENT", () => {
    const retrieveResponse = [
      {
        "id": 52,
        "request_id": 2,
        "user_id": 5,
        "comment": "<p>fred</p>",
        "active": true,
        "createdAt": "2019-11-19T09:43:02.194Z",
        "updatedAt": "2019-11-19T09:43:02.194Z"
      }
    ];
    const state = reducers({ comment: { comments: {} } }, {
      type: "RETRIEVE_COMMENT",
      payload: retrieveResponse,
    });
    expect(state.comment).toEqual({ comments: retrieveResponse, status: "comment_retrieve_success" });
  });
  test("RETRIEVE_COMMENT_FAIL", () => {
    const errorResponse = {
      "message": "no comment found"
    };
    const state = reducers({ comment: { error: {} } }, {
      type: "RETRIEVE_COMMENT_FAIL",
      payload: errorResponse,
    });
    expect(state.comment).toEqual({ error: errorResponse, status: "comment_retrieve_fail" });
  });
  test("SUBMIT_COMMENT", () => {
    const submitdata = {
      "id": 31,
      "request_id": 2,
      "user_id": 5,
      "comment": "some comment5",
      "updatedAt": "2019-11-19T05:56:19.399Z",
      "createdAt": "2019-11-19T05:56:19.399Z",
      "active": "true"
    };

    const state = reducers({ comment: { currentComment: {} } }, {
      type: "SUBMIT_COMMENT",
      payload: submitdata,
    });
    expect(state.comment).toEqual({ currentComment: submitdata, status: "comment_submit_success" });
  });

  test("SUBMIT_COMMENT_FAIL", () => {
    const submitFail = { error: "unknown error happened" };
    const state = reducers({ comment: { error: {} } }, {
      type: "SUBMIT_COMMENT_FAIL",
      payload: submitFail,
    });
    expect(state.comment).toEqual({ error: submitFail, status: "comment_submit_fail" });
  });
});
