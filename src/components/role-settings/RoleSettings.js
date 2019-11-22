/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { addRole, retrieveUsers } from "../../redux/actions/roleAction";
import { getCurrentUser } from "../../services/authServices";
import HomeNav from "../home-nav/HomeNav";
import SideBar from "../side-bar";
import editIcon from "../../assets/ic_create_white.svg";

import "./RoleSettings.scss";


// role setting component
const RoleSettings = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [travelAdmin, setTravelAdmin] = useState(false);
  const [manager, setManager] = useState(false);
  const [requester, setRequester] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const users = useSelector((state) => state.role.users, shallowEqual);
  const status = useSelector((state) => state.role.status, shallowEqual);
  const error = useSelector((state) => state.role.error, shallowEqual);


  // check user access level
  useLayoutEffect(() => {
    const user = getCurrentUser();
    if (user.role_value < 7) {
      history.replace("/dashboard");
    }
  }, []);

  const showNotification = (type, message) => {
    // clear state
    dispatch({ type: "CLEAR_STATE" });
    if (isLoading) {
      setIsLoading(false);
    }
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        break;
    }
  };

  // eslint-disable-next-line consistent-return
  const parseError = (err) => {
    if (!_.isEmpty(err)) {
      if (err.message) {
        return err.message;
      }
      if (err && _.isArray(err.error)) return err.error[0].msg;
      if (err.error) {
        return err.error;
      }
      return err.errors.message;
    }
  };

  if (status) {
    switch (status) {
      case "retrieve_fail":
        showNotification("error", parseError(error));
        break;
      case "role_add_success":
        showNotification("success", "role assigned successful!");
        break;
      case "role_add_fail":
        showNotification("error", parseError(error));
        break;
      default:
        break;
    }
  }

  const handleChange = (event) => {
    setEmail(event.target.value);
    const role = _.find(users, ["email", event.target.value]);
    switch (role.role_value) {
      case 7:
        setTravelAdmin(true);
        setManager(true);
        setRequester(true);
        break;
      case 6:
        setTravelAdmin(true);
        setManager(true);
        setRequester(false);
        break;
      case 5:
        setTravelAdmin(true);
        setRequester(true);
        setManager(false);
        break;
      case 4:
        setTravelAdmin(true);
        setManager(false);
        setRequester(false);
        break;
      case 3:
        setManager(true);
        setRequester(true);
        setTravelAdmin(false);
        break;
      case 2:
        setManager(true);
        setTravelAdmin(false);
        setRequester(false);
        break;
      case 1:
        setRequester(true);
        setTravelAdmin(false);
        setManager(false);
        break;
      default:
        break;
    }
  };

  const assignRole = () => {
    setIsLoading(true);
    let value = 0;
    if (travelAdmin) {
      value += 4;
    }
    if (manager) {
      value += 2;
    }
    if (requester) {
      value += 1;
    }
    return dispatch(addRole(value, email));
  };

  useEffect(() => {
    dispatch(retrieveUsers());
  }, []);

  return (
    <div>
      <HomeNav />
      <SideBar userRole={7} />
      <div className="role-card">
        <span className="title m-b-10">
          ROLE SETTING
        </span>
        <div className="role-setting">
          <div className="flex flex-column">
            <span className="title">User</span>
            <select name="email" className="input select" onChange={handleChange}>
              {
                users.map((item) => <option value={item.email} key={item.id}>{item.email}</option>)
              }
            </select>
          </div>
          <div className="flex flex-column">
            <span className="title">Role</span>
            <div className="flex flex-row">
              <input type="checkbox" name="travel_admin" id="travel_admin" onChange={(e) => setTravelAdmin(e.target.checked)} checked={travelAdmin} className="styled-checkbox" />
              <label htmlFor="travel_admin">Travel Admin</label>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" name="manager" id="manager" onChange={(e) => setManager(e.target.checked)} checked={manager} className="styled-checkbox" />
              <label htmlFor="manager">Manager</label>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" name="requester" id="requester" onChange={(e) => setRequester(e.target.checked)} checked={requester} className="styled-checkbox" />
              <label htmlFor="requester">Requester</label>
            </div>
          </div>
        </div>
        <div>
          <button type="button" id="assignBtn" className="btn btn-primary assign-btn" style={{ borderRadius: "20px" }} tabIndex={0} onClick={assignRole}>
            <img src={editIcon} witdh={18} height={18} alt="edit icon" />
            <span style={{ marginLeft: "5px", fontWeight: "bold" }}>assign role</span>
            {isLoading
              ? (<FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faCircleNotch} spin />)
              : null}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSettings;
