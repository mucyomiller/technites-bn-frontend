/* eslint-disable import/no-named-as-default */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import "./SingleRequest.scss";
import { connect } from "react-redux";
import SideBar from "../side-bar/index";
import Footer from "../footer/index";
import HomeNav from "../home-nav/HomeNav";
import Comment from '../comment/Comment';
import { retrieveProfile } from "../../redux/actions/profileAction";
import RequestPage from "../request-page/RequestPage";

export class SingleRequest extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.props.retrieveProfile();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps({ user }) {
    this.setState({ user });
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <HomeNav user={this.state.user} />
        <SideBar userRole={this.state.user.role_value} />
        <div className="content-container">
          <RequestPage />
          {id === "new" ? null : (<Comment requestId={id} owner={this.state.user.id} />)}
        </div>
        <Footer />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.profile.user
});

SingleRequest.defaultProps = {
  retrieveProfile: () => { }
};

export default compose(
  withRouter,
  connect(mapStateToProps, { retrieveProfile })
)(SingleRequest);
