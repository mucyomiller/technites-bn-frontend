/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/static-property-placement */
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Joi from "joi-browser";
import _ from "lodash";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { retrieveProfile, updateProfile } from "../../redux/actions/profileAction";
import HomeNav from "../home-nav/HomeNav";
import Input from "./Input";
import Select from "./Select";
import countries from "./country_list";
import "./ProfilePage.scss";
import avatarImg from "../../assets/avatar_img.png";
import editIcon from "../../assets/ic_create.svg";
import clearIcon from "../../assets/clear_icon.svg";

export class ProfilePage extends Component {
  schema = {
    firstname: Joi.string()
      .min(3)
      .label("FirstName"),
    lastname: Joi.string()
      .min(3)
      .label("LastName"),
    gender: Joi.string()
      .min(4)
      .label("Gender"),
    dob: Joi.string()
      .label("Date of Birth"),
    address: Joi.string()
      .min(3)
      .label("Address"),
    country: Joi.string()
      .min(3)
      .label("Where Do You Live"),
    language: Joi.string()
      .min(2)
      .label("Preferred Language"),
    currency: Joi.string()
      .min(2)
      .label("Preferred Currency"),
    company: Joi.string()
      .min(3)
      .label("Company"),
    department: Joi.string()
      .min(3)
      .label("Department"),
    line_manager: Joi.string()
      .min(3)
      .label("Line Manager"),
  };

  static propTypes = {
    fetchProfileInfo: PropTypes.func.isRequired,
    user: PropTypes.shape({ root: PropTypes.string }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      isLoading: true,
      isUpdating: false,
      errors: {},
      file: "",
      imagePreviewUrl: "",
      firstname: "",
      lastname: "",
      gender: "",
      dob: "",
      address: "",
      country: "",
      language: "",
      currency: "",
      company: "",
      department: "",
      line_manager: "",
      image_url: "",
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const { fetchProfileInfo } = this.props;
    fetchProfileInfo();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { user, status, error } = nextProps;
    if (status) {
      const err = this.parseError(error);
      if (err === "Invalid token") {
        window.location.assign("/login");
      }
      switch (status) {
        case "retrieve_success":
          this.setState({ isLoading: false });
          break;
        case "retrieve_fail":
          toast.error(err);
          break;
        case "update_success":
          this.setState({ isUpdating: false, isEditMode: false });
          toast.success("updated profile successful!");
          break;
        case "update_fail":
          this.setState({ isUpdating: false });
          toast.error(err);
          break;
        default:
          break;
      }
    }
    this.setState({ ...user });
  }

  parseError = (error) => {
    if (!_.isEmpty(error)) {
      // return error.error ? error.error : error.errors[0];
      if (error.error) {
        return error.error;
      }
      if (error && _.isArray(error.errors)) return error.errors[0];
      return error.errors.message;
    }
    return null;
  }

  toggleEdit = () => {
    const { isEditMode } = this.state;
    this.setState({ isEditMode: !isEditMode });
  }

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  _handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  handleInputChange(event) {
    const { target } = event;
    const { errors } = this.state;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    const err = this.validateProperty(name, value);
    if (err) errors[name] = err;
    else delete errors[name];
    this.setState({
      [name]: value,
      errors,
    });
  }

  handleUpdate() {
    this.setState({ isUpdating: true });
    const { updateprofileInfo } = this.props;
    const {
      file,
      firstname,
      lastname,
      gender,
      dob,
      address,
      country,
      language,
      currency,
      company,
      department,
      line_manager,
    } = this.state;
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("country", country);
    formData.append("language", language);
    formData.append("currency", currency);
    formData.append("company", company);
    formData.append("department", department);
    formData.append("line_manager", line_manager);
    updateprofileInfo(formData);
  }

  render() {
    const {
      isEditMode,
      firstname,
      lastname,
      gender,
      dob,
      address,
      country,
      language,
      currency,
      company,
      department,
      line_manager,
      image_url,
      isLoading,
      isUpdating,
      errors,
    } = this.state;
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="preview" />);
    } else if (image_url) {
      $imagePreview = (<img src={image_url} alt="preview" />);
    } else {
      $imagePreview = (<img src={avatarImg} alt="preview" />);
    }
    return (
      <div>
        <HomeNav user={{ firstname, image_url }} />
        <div className="e-profile-content">
          <div className="flex flex-row vertical-center space-between">
            <span className="title">Profile</span>
            <span id="btn_edit_toggle" className="title m-l-15 clickable" onClick={this.toggleEdit} role="button" tabIndex={0}><img src={isEditMode ? clearIcon : editIcon} width={24} height={24} alt="edit icon" /></span>
          </div>
          <div className="profile-divider" />
          <div className="e-column-grid">
            <div>
              <span className="title">User Information</span>
              <div className="section-divider" />
              <div className="m-b-15" />
              <Input mode={isEditMode} type="text" value={firstname} name="firstname" label="FirstName" handler={this.handleInputChange} error={errors.firstname} />
              <Input mode={isEditMode} type="text" value={lastname} name="lastname" label="LastName" handler={this.handleInputChange} error={errors.lastname} />
              <Select mode={isEditMode} label="Gender" name="gender" value={gender} options={["Male", "Female"]} handler={this.handleInputChange} error={errors.gender} />
              <Input mode={isEditMode} type="date" value={moment(dob).format("YYYY-MM-DD")} name="dob" label="Date of Birth" handler={this.handleInputChange} error={errors.dob} />
              <Input mode={isEditMode} type="text" value={address} name="address" label="Address" handler={this.handleInputChange} error={errors.address} />
              <Select mode={isEditMode} label="Where Do You Live" name="country" value={country} options={countries} handler={this.handleInputChange} error={errors.country} />
              <Select mode={isEditMode} label="Preferred Language" name="language" value={language} options={["English", "Français", "Kinyarwanda"]} handler={this.handleInputChange} error={errors.language} />
              <Select mode={isEditMode} label="Preferred Currency" name="currency" value={currency} options={["$ USD", "Rwandan Francs"]} handler={this.handleInputChange} error={errors.currency} />
            </div>
            <div>
              <span className="title">Company Information</span>
              <div className="section-divider" />
              <div className="m-b-15" />
              <Input mode={isEditMode} type="text" value={company} name="company" label="Company" handler={this.handleInputChange} error={errors.company} />
              <Input mode={isEditMode} type="text" value={department} name="department" label="Department" handler={this.handleInputChange} error={errors.department} />
              <Input mode={isEditMode} type="text" value={line_manager} name="line_manager" label="Line Manager" handler={this.handleInputChange} error={errors.line_manager} />
            </div>
            <div>
              <div className="image-preview">
                {$imagePreview}
              </div>
              {isEditMode ? (<input type="file" id="profileselector" onChange={this._handleImageChange} />) : null}
            </div>
          </div>
          {
            isEditMode
              ? (
                <div className="m-t-15">
                  <span className="btn btn-primary m-r-5" onClick={this.toggleEdit} role="button" tabIndex={0}>Cancel</span>
                  <span className="btn btn-primary" id="btn_update" onClick={this.handleUpdate} role="button" tabIndex={0}>
                    Update
                    {isUpdating
                      ? (<FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faCircleNotch} spin />)
                      : null}
                  </span>
                </div>
              )
              : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  user: profile.user,
  error: profile.error,
  status: profile.status,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProfileInfo: () => dispatch(retrieveProfile()),
  updateprofileInfo: (data) => dispatch(updateProfile(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);
