/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import PropTypes from "prop-types";
import { resetHostPassword } from "../../redux/actions/HostActions";
import "./HostReset.scss";
import Input from "../profile-page/Input";
import Button from "../common/Button";

export class HostReset extends Component {
  schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email"),
    old_password: Joi.string()
      .min(6)
      .required()
      .label("Old Password"),
    password: Joi.string()
      .required()
      .label("Password"),
    confirm_password: Joi.string()
      .required()
      .label("Confirm Password"),

  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      old_password: "",
      password: "",
      confirm_password: "",
      passwordReset: false,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps({ host, errors }) {
    if (host.passwordReset) {
      toast.success("Password Reset succesfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.location.href = "/login";
    }
    this.setState({ errors });
    if (Array.isArray(errors.errors)) {
      toast.error("Please fill in all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(errors.message ? errors.message : errors.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  onChange(event) {
    const { target } = event;
    const { errors } = this.state;
    const { value } = target;
    const { name } = target;
    const err = this.validateHost(name, value);
    if (err) errors[name] = err;
    else delete errors[name];
    this.setState({
      [name]: value,
      errors,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const host = {
      email: this.state.email,
      old_password: this.state.old_password,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
    };
    this.props.resetHostPassword(host);
  }

  validateHost = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  render() {
    const { errors } = this.state;
    return (
      <>
        <div className="host-wrapper">
          <div className="card-container">
            <form className="card" noValidate onSubmit={this.onSubmit}>
              <h1 className="title">Reset Password</h1>
              <Input
                id="email"
                mode
                type="text"
                name="email"
                label="Email"
                handler={this.onChange}
                error={errors.email}
              />
              <Input
                id="old_password"
                mode
                type="password"
                name="old_password"
                label="Old Password"
                handler={this.onChange}
                error={errors.old_password}
              />
              <Input
                id="password"
                mode
                type="password"
                name="password"
                label="New Password"
                handler={this.onChange}
                error={errors.password}
              />
              <Input
                id="confirm_password"
                mode
                type="password"
                name="confirm_password"
                label="Confirm Password"
                handler={this.onChange}
                error={errors.confirm_password}
              />
              <Button type="submit" label="Reset password" id="reset-password-host" />
            </form>
          </div>
        </div>
      </>
    );
  }
}
HostReset.propTypes = {
  resetHostPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  host: state.host,
});

export default connect(mapStateToProps, { resetHostPassword })(HostReset);
