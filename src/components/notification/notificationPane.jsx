/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./notidicationPane.scss";
import "./notificationModal.scss";
import { connect } from "react-redux";
import SingleNotification from "./singleNotification";
import CloseIconButton from "../common/close-icon-button";
import {
  getNotifications,
  markAllRead,
  toggleNotPane,
} from "../../redux/actions/notificationActions";

export class NotificationPane extends Component {
  async componentDidMount() {
    const { loadNotifications } = this.props;
    await loadNotifications();
  }

  render() {
    const {
      notifications,
      displayNots,
      toggleNotDisplay,
      markRead,
    } = this.props;
    return (
      <div>
        <div
          data-test="modal-nav"
          className={`notificationPane modal-notif ${
            displayNots ? "modal-active " : " "
          }`}
        >
          <div className="modal-header">
            <h2 className="modal-title">Notifications</h2>
            <CloseIconButton
              onClose={toggleNotDisplay}
              data-test="close-icon"
            />
          </div>
          <div className="modal-body">
            <div className="notificationsList">
              <ul>
                {notifications
                  && notifications.map((not) => (
                    <SingleNotification
                      type={not.type}
                      message={not.message}
                      seen={not.seen}
                      key={not.id}
                      requestId={not.request_id}
                      notId={not.id}
                    />
                  ))}
              </ul>
            </div>
            {notifications && notifications.length > 0 ? (
              <div className="mark-read">
                <button
                  data-test="mark-read-button"
                  type="submit"
                  href="#"
                  onClick={markRead}
                  className="mark-read-button"
                >
                  Mark all as read
                </button>
              </div>
            ) : (
              <p data-test="text-no-notifs" className="center-link">
                No unread notifications
              </p>
            )}
          </div>
        </div>
        <div
          data-test="modal-overlay"
          onClick={toggleNotDisplay}
          className={`modal-over-lay ${
            displayNots ? "modal-over-lay-active " : " "
          }`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
  displayNots: state.notifications.notPaneDisplay,
  isAuthenticated: state.loginState.isAuthenticated,
});

const mapDispatchToProps = {
  loadNotifications: getNotifications,
  markRead: markAllRead,
  toggleNotDisplay: toggleNotPane,
};

NotificationPane.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notifications: PropTypes.array.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  markRead: PropTypes.func.isRequired,
  displayNots: PropTypes.bool.isRequired,
  toggleNotDisplay: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPane);
