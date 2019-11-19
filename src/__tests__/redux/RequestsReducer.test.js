import UserRequestsReducer from "../../redux/reducers/RequestsReducer";

describe("UserRequestsReducer unit tests", () => {
  it("should reduce user requests", () => {
    const state = UserRequestsReducer(
      { requestFound: false, requests: [] },
      {
        type: "GET_REQUESTS",
        payload: [
          {
            id: 8,
            user_id: 9,
            request_type: "OneWay",
            location_id: 3,
            departure_date: "2019-11-16",
            return_date: null,
            destinations: [
              {
                room_id: 2,
                check_in: "2019-11-18T15:16:38.447Z",
                check_out: "2019-12-27T15:16:38.447Z",
                destination_id: 4,
                accomodation_id: 1,
              },
            ],
            reason: "Visit Lagos",
            status: "Pending",
            createdAt: "2019-11-11T06:53:54.602Z",
            updatedAt: "2019-11-11T06:53:54.602Z",
          },
        ],
      },
    );
    expect(state).toEqual({
      requestFound: true,
      requests: [
        {
          id: 8,
          user_id: 9,
          request_type: "OneWay",
          location_id: 3,
          departure_date: "2019-11-16",
          return_date: null,
          destinations: [
            {
              room_id: 2,
              check_in: "2019-11-18T15:16:38.447Z",
              check_out: "2019-12-27T15:16:38.447Z",
              destination_id: 4,
              accomodation_id: 1,
            },
          ],
          reason: "Visit Lagos",
          status: "Pending",
          createdAt: "2019-11-11T06:53:54.602Z",
          updatedAt: "2019-11-11T06:53:54.602Z",
        },
      ],
    });
  });
});


describe("Admin viewing all requests unit tests", () => {
  it("should reduce all requests", () => {
    const state = UserRequestsReducer(
      { requestFound: false, requests: [] },
      {
        type: "GET_ALL_REQUESTS",
        payload: [
          {
            id: 8,
            user_id: 9,
            request_type: "OneWay",
            location_id: 3,
            departure_date: "2019-11-16",
            return_date: null,
            destinations: [
              {
                room_id: 2,
                check_in: "2019-11-18T15:16:38.447Z",
                check_out: "2019-12-27T15:16:38.447Z",
                destination_id: 4,
                accomodation_id: 1,
              },
            ],
            reason: "Visit Lagos",
            status: "Pending",
            createdAt: "2019-11-11T06:53:54.602Z",
            updatedAt: "2019-11-11T06:53:54.602Z",
          },
          {
            id: 9,
            user_id: 9,
            request_type: "OneWay",
            location_id: 3,
            departure_date: "2019-11-16",
            return_date: null,
            destinations: [
              {
                room_id: 2,
                check_in: "2019-11-18T15:16:38.447Z",
                check_out: "2019-12-27T15:16:38.447Z",
                destination_id: 4,
                accomodation_id: 1,
              },
            ],
            reason: "Visit Lagos",
            status: "Pending",
            createdAt: "2019-11-11T06:53:54.602Z",
            updatedAt: "2019-11-11T06:53:54.602Z",
          },
        ],
      },
    );
    expect(state).toEqual({
      requestFound: true,
      requests: [
        {
          id: 8,
          user_id: 9,
          request_type: "OneWay",
          location_id: 3,
          departure_date: "2019-11-16",
          return_date: null,
          destinations: [
            {
              room_id: 2,
              check_in: "2019-11-18T15:16:38.447Z",
              check_out: "2019-12-27T15:16:38.447Z",
              destination_id: 4,
              accomodation_id: 1,
            },
          ],
          reason: "Visit Lagos",
          status: "Pending",
          createdAt: "2019-11-11T06:53:54.602Z",
          updatedAt: "2019-11-11T06:53:54.602Z",
        },
        {
          id: 9,
          user_id: 9,
          request_type: "OneWay",
          location_id: 3,
          departure_date: "2019-11-16",
          return_date: null,
          destinations: [
            {
              room_id: 2,
              check_in: "2019-11-18T15:16:38.447Z",
              check_out: "2019-12-27T15:16:38.447Z",
              destination_id: 4,
              accomodation_id: 1,
            },
          ],
          reason: "Visit Lagos",
          status: "Pending",
          createdAt: "2019-11-11T06:53:54.602Z",
          updatedAt: "2019-11-11T06:53:54.602Z",
        },
      ],
    });
  });
});
