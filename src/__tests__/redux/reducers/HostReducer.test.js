import HostReducer from "../../../redux/reducers/HostReducer";
import * as types from "../../../redux/actions/actionType";

describe("AdminReducer unit tests", () => {
  it("should reduce Admin requests", () => {
    const state = HostReducer(
      { passwordReset: false },
      {
        type: "RESET_HOST",
        payload: [
          {
            status: 200,
            message: "Password succesfully Reset",
            data: {
              newHost: {
                id: 86,
                firstname: "Rugumbira",
                lastname: "Jordy",
                email: "technitesdev@gmail.com",
                username: "RugumbiraJordy",
                is_verified: false,
                role_value: 0,
                phone: null,
                gender: null,
                dob: null,
                address: null,
                country: null,
                language: null,
                currency: null,
                image_url: null,
                company: null,
                department: null,
                line_manager: null,
                isEmailAllowed: "true",
                auto_fill: false,
              },
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlY2huaXRlc2RldkBnbWFpbC5jb20iLCJpYXQiOjE1NzQ3MDk2ODMsImV4cCI6MTU3NDc5NjA4M30.EP0fNJQbVhOZ0Kd2kQ-7kpAqvD5vPxhPE6Ex8dVZ4CI",
            },
          },
        ],
      },
    );
    expect(state).toEqual({
      passwordReset: true,
    });
  });
});
