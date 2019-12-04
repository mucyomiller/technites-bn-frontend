import ChatReducer from "../../../redux/reducers/ChatReducer";
import * as types from "../../../redux/actions/actionType";

describe("Chat Reducer unit tests", () => {
  it("should reduce fetching all chats", () => {
    const state = ChatReducer(
      { messages: [] },
      {
        type: "GET_ALL_MESSAGES",
        payload: [
          {
            id: 1,
            message: "Hey guys",
            createdAt: "2019-03-19T16:44:23.891Z",
            User: {
              id: 46,
              firstname: "Test",
              lastname: "test",
              image_url:
                "https://res.cloudinary.com/dodfpnbik/image/upload/v1574070442/Screen_Shot_2019-11-18_at_11.44.38_bdjv7r.png"
            }
          }
        ]
      }
    );
    expect(state).toEqual({
      messages: [
        {
          id: 1,
          message: "Hey guys",
          createdAt: "2019-03-19T16:44:23.891Z",
          User: {
            id: 46,
            firstname: "Test",
            lastname: "test",
            image_url:
              "https://res.cloudinary.com/dodfpnbik/image/upload/v1574070442/Screen_Shot_2019-11-18_at_11.44.38_bdjv7r.png"
          }
        }
      ]
    });
  });
});
