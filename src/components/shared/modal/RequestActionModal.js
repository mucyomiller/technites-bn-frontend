/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";
import { connect } from "react-redux";
import { approveReject } from "../../../redux/actions/RequestActions";

export class RequestActionModal extends Component {
  handleAction = (action, data, status) => {
    this.props.approveReject(data, action, status);
    this.props.closeModal();
  };

  render() {
    const { action, data, triggerText, status } = this.props;
    return ReactDOM.createPortal(
      <FocusTrap>
        <aside
          tag="aside"
          role="dialog"
          tabIndex="-1"
          aria-modal="true"
          className="modal-cover"
          onClick={this.props.onClickOutside}
          onKeyDown={this.props.onKeyDown}
        >
          <div className="modal-area" ref={this.props.modalRef}>
            <button
              ref={this.props.buttonRef}
              aria-label="Close Modal"
              aria-labelledby="close-modal"
              className="_modal-close"
              onClick={this.props.closeModal}
            >
              <span id="close-modal" className="_hide-visual">
                Close
              </span>
              <svg className="_modal-close-icon" viewBox="0 0 40 40">
                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
              </svg>
            </button>
            <div className="modal-body">
              <div>
                <p>
                  Request type: <strong> {data.request_type} </strong>
                </p>
                <br />

                <p>
                  By:{" "}
                  <strong>{`${data.User.firstname} ${data.User.lastname}`}</strong>
                </p>
                <br />
                <p>
                  Are you sure you want to: <strong>{triggerText}</strong> this
                  request?
                </p>
                <br />
              </div>

              <div className="modal-footer">
                <span
                  className="action"
                  onClick={() => this.handleAction(action, data, status)}
                >
                  {triggerText}
                </span>
                {"     "}
                <span className="cancel" onClick={this.props.closeModal}>
                  Cancel
                </span>
              </div>
              <hr />
              <p>
                <strong><em> N/B: This action is irriversible </em></strong>
              </p>
            </div>
          </div>
        </aside>
      </FocusTrap>,
      document.body,
    );
  }
}

export default connect(null, { approveReject })(RequestActionModal);
