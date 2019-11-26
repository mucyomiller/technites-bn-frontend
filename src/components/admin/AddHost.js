/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import _ from "lodash";
import { retrieveProfile } from "../../redux/actions/profileAction";
import { addHost } from "../../redux/actions/AdminActions";
import HomeNav from "../home-nav/HomeNav";
import SideBar from "../side-bar";
import Footer from "../footer";
import "./AddHost.scss";
import Input from "../profile-page/Input";
import Button from "../common/Button";


export class AddHost extends Component {
    schema = {
      email: Joi.string()
        .min(4)
        .email({ minDomainSegments: 2 })
        .label("Email")
        .required(),
      firstname: Joi.string()
        .min(3)
        .label("Firstname")
        .required(),
      lastname: Joi.string()
        .min(3)
        .label("Lastname")
        .required(),
    };

    constructor(props) {
      super(props);
      this.state = {
        email: "",
        firstname: "",
        lastname: "",
        errors: {},
        user: {},
        hostAdded: false,
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
      this.props.retrieveProfile();
    }

    UNSAFE_componentWillReceiveProps({ errors, user, admin }) {
      if (user.role_value < 7) {
        window.location.href = "/dashboard";
      }
      if (admin.hostAdded) {
        toast.success("Host Added succesfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.href = "/addHost";
      }
      this.setState({ errors, user });
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
        firstname: this.state.firstname,
        lastname: this.state.lastname,
      };
      this.props.addHost(host);
    }

    validateHost = (name, value) => {
      const obj = { [name]: value };
      const schema = { [name]: this.schema[name] };
      const { error } = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
    };

    render() {
      const { user } = this.props;
      const { errors } = this.state;
      return (
        <>
          <HomeNav user={user} />
          <SideBar userRole={user.role_value} />
          <div className="page-info">
            <h1 className="page-title">Add Host</h1>
            <h4 className="sub-title">
              {" "}
              <span className="sub-title-info">
                <a href="#">Dashboard </a>
              </span>
            /
              <span className="sub-title-info">
                <a href="#"> Add Host</a>
              </span>
            </h4>
          </div>
          <div className="wrapper">
            <form noValidate onSubmit={this.onSubmit}>
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
                id="firstname"
                mode
                type="text"
                name="firstname"
                label="Firstname"
                handler={this.onChange}
                error={errors.firstname}
              />
              <Input
                id="lastname"
                mode
                type="text"
                name="lastname"
                label="Lastname"
                handler={this.onChange}
                error={errors.lastname}
              />
              <Button type="submit" label="Add Host" id="add-host" />
            </form>
          </div>
          <Footer />
        </>
      );
    }
}
const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.profile.user,
  admin: state.admin,
});
export default connect(mapStateToProps, { retrieveProfile, addHost })(AddHost);
