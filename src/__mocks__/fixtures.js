
export const loginPayload = {
  token: "test token",
  user: { email: "test user" },
};

export const user = {
  id: 28,
  email: "amilylisy@yahoo.com",
  firstname: "amily",
  lastname: "kassim",
  role_value: 1,
  username: "amilykassim",
};

export const payload = {
  status: 20,
  message: "Sign up the",
  data: user,
  token: "eyJhbGcibK-l8Ic4",
};

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0bmFtZSI6IkZyZWQiLCJsYXN0bmFtZSI6Ik11Y3lvIiwiZW1haWwiOiJtdWN5b21pbGxlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6bnVsbCwiaXNfdmVyaWZpZWQiOnRydWUsInJvbGVfdmFsdWUiOjEsInBob25lIjpudWxsLCJnZW5kZXIiOiJNYWxlIiwiZG9iIjoiMTk5NC0wNS0wMlQwMDowMDowMC4wMDBaIiwiYWRkcmVzcyI6Im51bGwiLCJjb3VudHJ5IjoibnVsbCIsImxhbmd1YWdlIjoibnVsbCIsImN1cnJlbmN5IjoibnVsbCIsImltYWdlX3VybCI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vdGVjaG5pdGVzL2ltYWdlL3VwbG9hZC92MTU3MzgwODYzNy9tdHd3a2ExZHh0aWVrd3Nncmlvai5qcGciLCJjb21wYW55IjoiQW5kZWxhIiwiZGVwYXJ0bWVudCI6IkVuZ2luZWVyaW5nIiwibGluZV9tYW5hZ2VyIjoicnVndW1iaXJham9yZHliYXN0aWVuQGdtYWlsLmNvbSIsImlzRW1haWxBbGxvd2VkIjoidHJ1ZSIsImlhdCI6MTU3MzgwODg1NiwiZXhwIjoxNTczODk1MjU2fQ._fvFcTCo7YdJ1yL_X_iVFOrby5k5b3bcrOb0f9DQpEo";

export const request = {
  User: {
    id: 5,
    firstname: "Dennis",
    lastname: "Lohan",
    username: "requesting",
    email: "requester@request.com",
  },
  id: 9,
  user_id: 5,
  request_type: "ReturnTrip",
  location_id: 1,
  departure_date: "2020-09-25",
  status: "Pending",
};

export const requests = [request];

export const room = {
  id: 1,
  accommodation_id: 1,
  name: "Room1",
  room_type: "single",
  description: "This is a very good room",
  cost: 200,
  status: true,
  images: [{ image_url: "" }],
  createdAt: "2019-10-11T10:50:28.272Z",
  updatedAt: "2019-10-11T11:07:21.598Z",
};

export const rooms = [room];

export const accommodation = {
  id: 1,
  accommodation_name: "Villa Rosa Kempiskey",
  room_type: null,
  description: "Luxury holiday resorts, busin…he world.",
  location: "4",
  images: ["https://res.cloudinary.com/t…lhkt.jpg"],
  quantity: null,
  services: null,
  amenities: null,
  available_space: 8,
  owner: null,
  createdAt: "2019-10-11T10:50:28.266Z",
  updatedAt: "2019-10-11T11:17:52.215Z",
  Feedbacks: [],
  Rooms: rooms,
  likes: 0,
};

export const accommodationNoImageAndRooms = {
  id: 1,
  accommodation_name: "Villa Rosa Kempiskey",
  room_type: null,
  description: "Luxury holiday resorts, busin…he world.",
  location: "4",
  quantity: null,
  services: null,
  amenities: null,
  available_space: 8,
  owner: null,
  createdAt: "2019-10-11T10:50:28.266Z",
  updatedAt: "2019-10-11T11:17:52.215Z",
  Feedbacks: [],
  likes: 0,
};

export const accommodationNoDesc = {
  id: 1,
  accommodation_name: "Villa Rosa Kempiskey",
  room_type: null,
  description: null,
  location: "4",
  images: ["https://res.cloudinary.com/t…lhkt.jpg"],
  quantity: null,
  services: null,
  amenities: null,
  available_space: 8,
  owner: null,
  createdAt: "2019-10-11T10:50:28.266Z",
  updatedAt: "2019-10-11T11:17:52.215Z",
  Feedbacks: [],
  Rooms: rooms,
  likes: 0,
};

export const accommodations = [accommodation, accommodationNoDesc];

export const notifications = {
  notifications: [
    {
      createdAt: "2019-11-13T10:07:21.401Z",
      id: 8,
      message: "visit nairobi",
      request_id: 12,
      seen: "false",
      type: "ReturnTrip",
      updatedAt: "2019-11-15T13:13:44.347Z",
      user_id: 49,
      notPaneDisplay: false,
    },
  ],
  markThisRead: jest.fn(),
  toggleNotDisplay: jest.fn(),
  notPaneDisplay: false,
  notificationCount: 1,
};

export const messages = {
    messages: [
      {
        id: 1,
        message: "test",
        User: {
          firstname: "user",
          lastname: "test",
          image_url: "image",
          id: 1
        },
        createdAt: "Tes"
      },
      {
        id: 2,
        message: "test",
        User: {
          firstname: "user",
          lastname: "test",
          image_url: "image",
          id: 10
        },
        createdAt: "Tes"
      },
      {
        id: 3,
        message: "test",
        User: {
          firstname: "user",
          lastname: "test",
          image_url: "",
          id: 10
        },
        createdAt: "Tes"
      },
      {
        id: 1,
        message: "test",
        User: {
          firstname: "user",
          lastname: "test",
          image_url: "",
          id: 1
        },
        createdAt: "Tes"
      }
    ]
}
export const propsTemplate = {
  loading: false, 
  showState: true, 
  newMessage: true,
  scrollToBottom: jest.fn(),
  fetchAllMessages: jest.fn(),
  messages,
  sendMessage: jest.fn(),
  sendMessageOnKeyPress: jest.fn(),
  notifications: {
    notifications: [
      {
        createdAt: "2019-11-13T10:07:21.401Z",
        id: 8,
        message: "visit nairobi",
        request_id: 12,
        seen: "false",
        type: "ReturnTrip",
        updatedAt: "2019-11-15T13:13:44.347Z",
        user_id: 49,
        notPaneDisplay: false,
      },
    ],
    markThisRead: jest.fn(),
    toggleNotDisplay: jest.fn(),
    notPaneDisplay: false,
    notificationCount: 1,
  },
  loginState: {
    isAuthenticated: true,
  },
  profile: {
    user: {
      firstname: "Rugumbira",
      image_url:
      "https://res.cloudinary.com/dodfpnbik/image/upload/v1574070442/Screen_Shot_2019-11-18_at_11.44.38_bdjv7r.png",
      role_value: 7,
    },
  },
  user: {
    firstname: "Rugumbira",
    image_url:
    "https://res.cloudinary.com/dodfpnbik/image/upload/v1574070442/Screen_Shot_2019-11-18_at_11.44.38_bdjv7r.png",
    role_value: 7,
    id:10,
  },
  postsPerPage: 4,
  currentPage: 1,
  errors: {},
  addHost:jest.fn(),
  retrieveProfile: jest.fn(),
  requests: {
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
        User: {
          image_url: "image",
          email: "usertest@gmail.com",
          phone: "123456",
          gender: "male",
          address: "address",
          country: "country",
          language: "language",
          company: "company",
          department: "department",
        },
      },
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
        status: "Accepted",
        createdAt: "2019-11-11T06:53:54.602Z",
        updatedAt: "2019-11-11T06:53:54.602Z",
        User: {
          image_url: "image",
          email: "usertest@gmail.com",
          phone: "123456",
          gender: "male",
          address: "address",
          country: "country",
          language: "language",
          company: "company",
          department: "department",
        },
      },
    ],
  },
};
