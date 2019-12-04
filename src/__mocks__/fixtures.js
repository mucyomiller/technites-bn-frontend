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
