/* eslint-disable arrow-parens */
/* eslint-disable no-restricted-globals */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/state-in-constructor */
import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "../input/input";
import Select from "../select/Select";
import "./form.scss";
import EditorComponent from "./EditorComponent";

class Form extends Component {
  state = {
    data: { destinations: [{}] },
    errors: {},
    counter: { animation: "", count: 0 },
    cities: [
      { id: 0, name: "Choose a country" },
      { id: 1, name: "Kigali" },
      { id: 2, name: "New York" },
      { id: 3, name: "Lagos" },
      { id: 4, name: "Dubai" },
      { id: 5, name: "Kinshasa" }
    ],
    accomodations: [{ id: 0, name: "Choose an accomodation" }],
    currentAccomodations: [{ id: 0, name: "Choose an accomodation" }],
    rooms: [{ id: 0, name: "Choose a room" }],
    currentRooms: [{ id: 0, name: "Choose a room" }],
    autoFill: false
  };

  validate = () => {
    const options = { abortEarly: false };
    const { data } = this.state;

    const { error } = Joi.validate(data, this.schema, options);

    if (!error) {
      // if (this.state.data.confirmPassword) {
      //   if (this.state.data.password !== this.state.data.confirmPassword) {
      //     toast.error("Password and Confirm password should be the same");
      //     return {};
      //   }
      // }
      return null;
    }

    if (error) {
      const errors = {};
      for (const item of error.details) errors[item.path[0]] = item.message;
      return errors;
    }
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = async (e, addCity) => {
    const counter = { ...this.state.counter };
    const data = { ...this.state.data };

    if (e === "back") {
      counter.count--;

      this.mapViewToModel(counter.count);
      this.setState({ counter });
    } else if (e === "forward") {
      counter.count++;

      this.mapViewToModel(counter.count);
      this.setState({ counter });
    } else if (e === "submit") {
      const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return;

      this.setState({ data }, () => {
        this.doSubmit();
      });
    } else if (addCity === "addCity") {
      delete data.destination_id;
      delete data.accomodation_id;
      delete data.room_id;
      delete data.check_in;
      delete data.check_out;

      // data.destinations.push({});
      // counter.count++;
      // counter.animation = "animation";

      // this.setState({ data });

      const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return;

      data.destinations.push({});
      counter.count++;
      counter.animation = "animation";

      this.setState({ data });
      this.setState({ counter });
    } else if (e === "edit") {
      const newDestinations = data.destinations.map(
        ({ room_id, ...rest }) => rest
      );
      data.destinations = newDestinations;

      this.setState({ data }, () => {
        this.doSubmit("edit");
      });
    } else if (e === "delete") {
      this.doSubmit("delete");
    } else if (e === "register") {
      this.setState({ data }, () => {
        this.doSubmit();
      });
    } else if (e === "login") {
      this.setState({ data }, () => {
        this.doSubmit();
      });
    } else if (e === "email_forgot") {
      this.setState({ data }, () => {
        this.doSubmit();
      });
    } else if (e === "reset") {
      this.setState({ data }, () => {
        this.doSubmit();
      });
    }
  };

  mapViewToModel = count => {
    const { data } = { ...this.state };

    data.destination_id = data.destinations[count].destination_id;
    data.accomodation_id = data.destinations[count].accomodation_id;
    data.room_id = data.destinations[count].room_id;
    data.check_in = data.destinations[count].check_in;
    data.check_out = data.destinations[count].check_out;

    this.setState({ data });
  };

  handleChange = e => {
    const { target: input } = e;
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    data.request_type = "ReturnTrip";

    if (data.return_date === undefined || data.return_date === "") {
      data.request_type = "OneWay";
      delete data.return_date;
    }

    // counter;
    const counter = { ...this.state.counter };

    // add data to the destinations and the whole data object but clean it after but from only the data object down below
    if (isNaN(input.value)) {
      data.destinations[counter.count][input.name] = input.value;
    } else {
      data.destinations[counter.count][input.name] = Number(input.value);
    }

    delete data.destinations[counter.count].location_id;
    delete data.destinations[counter.count].departure_date;
    delete data.destinations[counter.count].return_date;
    delete data.destinations[counter.count].reason;
    delete data.destinations[counter.count].passport_name;
    delete data.destinations[counter.count].passport_number;

    const { accomodations, rooms } = this.state;

    const res = accomodations.filter(ac => ac.location === Number(input.value));
    res.unshift({ id: 0, name: "Select an accomodation" });
    const selectedRooms = [];

    if (e.target.id === "accomodation_id") {
      rooms.map(room => {
        if (room.accomodation_id === Number(input.value)) {
          selectedRooms.push(room);
        }
      });
      selectedRooms.unshift({ id: 0, name: "Select a room" });
      this.setState({ currentRooms: selectedRooms });
    }

    if (input.name === "destination_id") {
      this.setState({ currentAccomodations: res });
    }

    this.setState({ data, errors });
  };

  handleChangeEditor = markUp => {
    const { data } = this.state;
    data.reason = markUp;

    this.setState({ data });
  };

  handleAutoFill = (e) => {
    this.setState({ autoFill: e.target.checked });
    this.doSubmit("autoFill", e.target.checked);
  }

  renderEditor = () => {
    return (
      <div>
        <EditorComponent handleChange={this.handleChangeEditor} />
      </div>
    );
  };

  renderButton(label, animation = "", addCity = "") {
    return (
      <button
        onClick={() => this.handleSubmit(animation, addCity)}
        className="button"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options, type = "text") {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        type={type}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export { Form as FormTest };

export default Form;
