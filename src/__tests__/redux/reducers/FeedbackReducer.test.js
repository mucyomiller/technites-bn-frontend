import reducers from "../../../redux/reducers/rootReducer";

describe("Feedback reducers", () => {
  test("RETRIEVE_FEEDBACK_SUCCESS", () => {
    const feedbacks = [{
      "id": 2,
      "feedback": "some feedback",
      "user_id": 1,
      "accommodation_id": 9,
      "createdAt": "2019-12-03T10:33:07.474Z",
      "updatedAt": "2019-12-03T10:33:07.474Z",
      "User": {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "image_url": null
      }
    }
    ];
    const state = reducers({ feedback: { feedbacks: [] } }, {
      type: "RETRIEVE_FEEDBACK_SUCCESS",
      payload: feedbacks,
    });
    expect(state.feedback).toEqual({ feedbacks: feedbacks, status: "feedback_retrieve_success" });
  });
  test("RETRIEVE_FEEDBACK_FAIL", () => {
    const errorResponse = {
      "message": "no feedback found"
    };
    const state = reducers({ feedback: { error: {} } }, {
      type: "RETRIEVE_FEEDBACK_FAIL",
      payload: errorResponse,
    });
    expect(state.feedback).toEqual({ error: errorResponse, status: "feedback_retrieve_fail" });
  });
  test("SUBMIT_FEEDBACK_SUCCESS", () => {
    const submitdata = {
      "feedback": "some feedback"
    };

    const state = reducers({ feedback: { currentFeedback: {} } }, {
      type: "SUBMIT_FEEDBACK_SUCCESS",
      payload: submitdata,
    });
    expect(state.feedback).toEqual({ currentFeedback: submitdata, status: "feedback_submit_success" });
  });

  test("SUBMIT_FEEDBACK_FAIL", () => {
    const submitFail = { error: "unknown error happened" };
    const state = reducers({ feedback: { error: {} } }, {
      type: "SUBMIT_FEEDBACK_FAIL",
      payload: submitFail,
    });
    expect(state.feedback).toEqual({ error: submitFail, status: "feedback_submit_fail" });
  });
});
